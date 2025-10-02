import {Command, Flags} from '@oclif/core'
import {readFile} from 'node:fs/promises'
import {resolve} from 'node:path'

interface PackageJson {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  name?: string
  version?: string
}

interface PackageLockJson {
  packages: Record<string, {
    version?: string
  }>
}

interface NpmRegistryResponse {
  'dist-tags': {
    latest: string
  }
  time: Record<string, string>
}

interface PackageReport {
  firstReleaseDate: Date
  installedVersion: string
  installedVersionDate: Date
  latestVersionDate: Date
  name: string
  warnings: string[]
}

export default class Check extends Command {
  static description = 'Check dependencies for potential supply chain security issues'
  static examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> --package-age 60',
    '<%= config.bin %> <%= command.id %> --version-age 7 --unmaintained 730',
  ]
  static flags = {
    'package-age': Flags.integer({
      char: 'p',
      default: 30,
      description: 'Maximum age in days for package initial release (default: 30)',
    }),
    unmaintained: Flags.integer({
      char: 'u',
      default: 365,
      description: 'Maximum age in days since last release to consider unmaintained (default: 365)',
    }),
    'version-age': Flags.integer({
      char: 'v',
      default: 2,
      description: 'Maximum age in days for installed version (default: 2)',
    }),
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Check)

    const packageJsonPath = resolve(process.cwd(), 'package.json')
    const packageJson = await this.readPackageJson(packageJsonPath)

    const packageLockPath = resolve(process.cwd(), 'package-lock.json')
    const packageLock = await this.readPackageLock(packageLockPath)

    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    }

    if (Object.keys(dependencies).length === 0) {
      this.log('No dependencies found in package.json')
      return
    }

    this.log(`Checking ${Object.keys(dependencies).length} packages...\n`)

    const reports: PackageReport[] = []

    for await (const [name, versionSpec] of Object.entries(dependencies)) {
      try {
        const report = await this.checkPackage(name, versionSpec, flags, packageLock)
        reports.push(report)
      } catch (error) {
        this.warn(`Failed to check package ${name}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    this.displayReport(reports)
  }

  private async checkPackage(
    name: string,
    versionSpec: string,
    flags: {'package-age': number; unmaintained: number; 'version-age': number},
    packageLock: PackageLockJson,
  ): Promise<PackageReport> {
    const packageInfo = await this.fetchPackageInfo(name)

    // Get actual installed version from package-lock.json
    const lockEntry = packageLock.packages[`node_modules/${name}`]
    const installedVersion = lockEntry?.version || versionSpec.replace(/^[^0-9]*/, '')

    const timeEntries = Object.entries(packageInfo.time).filter(([key]) => key !== 'created' && key !== 'modified')
    const sortedVersions = timeEntries.sort(
      ([, dateA], [, dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime(),
    )

    const firstRelease = sortedVersions[0]
    const firstReleaseDate = new Date(firstRelease[1])

    const latestVersion = packageInfo['dist-tags'].latest
    const latestVersionDate = new Date(packageInfo.time[latestVersion])

    const now = new Date()
    const warnings: string[] = []

    // Check if installed version exists in registry
    let installedVersionDate: Date
    if (packageInfo.time[installedVersion]) {
      installedVersionDate = new Date(packageInfo.time[installedVersion])
    } else {
      warnings.push(`Version ${installedVersion} not found in npm registry`)
      installedVersionDate = now // Use current date as fallback for display purposes
    }

    // Check 1: Package is too new
    const packageAgeDays = this.getDaysDifference(firstReleaseDate, now)
    if (packageAgeDays < flags['package-age']) {
      warnings.push(`Package is too new (${packageAgeDays} days old, threshold: ${flags['package-age']} days)`)
    }

    // Check 2: Installed version is too new (only if version was found)
    if (packageInfo.time[installedVersion]) {
      const versionAgeDays = this.getDaysDifference(installedVersionDate, now)
      if (versionAgeDays < flags['version-age']) {
        warnings.push(
          `Installed version is too new (${versionAgeDays} days old, threshold: ${flags['version-age']} days)`,
        )
      }
    }

    // Check 3: Package appears unmaintained
    const daysSinceLastRelease = this.getDaysDifference(latestVersionDate, now)
    if (daysSinceLastRelease > flags.unmaintained) {
      warnings.push(
        `Package may be unmaintained (${daysSinceLastRelease} days since last release, threshold: ${flags.unmaintained} days)`,
      )
    }

    return {
      firstReleaseDate,
      installedVersion,
      installedVersionDate,
      latestVersionDate,
      name,
      warnings,
    }
  }

  private displayReport(reports: PackageReport[]): void {
    const packagesWithWarnings = reports.filter((r) => r.warnings.length > 0)
    const safePackages = reports.filter((r) => r.warnings.length === 0)

    this.log('=== SECURITY CHECK REPORT ===\n')

    if (packagesWithWarnings.length > 0) {
      this.log(`⚠️  Found ${packagesWithWarnings.length} package(s) with warnings:\n`)

      for (const report of packagesWithWarnings) {
        this.log(`📦 ${report.name}@${report.installedVersion}`)
        this.log(`   First release: ${report.firstReleaseDate.toISOString().split('T')[0]}`)
        this.log(`   Installed version date: ${report.installedVersionDate.toISOString().split('T')[0]}`)
        this.log(`   Latest release: ${report.latestVersionDate.toISOString().split('T')[0]}`)

        for (const warning of report.warnings) {
          this.log(`   ⚠️  ${warning}`)
        }

        this.log('')
      }
    }

    if (safePackages.length > 0) {
      this.log(`✅ ${safePackages.length} package(s) passed all checks\n`)
    }

    this.log('=== END REPORT ===')
  }

  private async fetchPackageInfo(packageName: string): Promise<NpmRegistryResponse> {
    const url = `https://registry.npmjs.org/${packageName}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch package info: ${response.statusText}`)
    }

    return response.json() as Promise<NpmRegistryResponse>
  }

  private getDaysDifference(date1: Date, date2: Date): number {
    const diff = Math.abs(date2.getTime() - date1.getTime())
    return Math.floor(diff / (1000 * 60 * 60 * 24))
  }

  private async readPackageJson(path: string): Promise<PackageJson> {
    try {
      const content = await readFile(path, 'utf8')
      return JSON.parse(content) as PackageJson
    } catch (error) {
      this.error(`Failed to read package.json: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private async readPackageLock(path: string): Promise<PackageLockJson> {
    try {
      const content = await readFile(path, 'utf8')
      return JSON.parse(content) as PackageLockJson
    } catch (error) {
      this.error(`Failed to read package-lock.json: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}
