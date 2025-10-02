# pkgshield

A CLI tool to protect against supply chain attacks from hallucinated dependencies (also known as "[slopsquatting](https://en.wikipedia.org/wiki/Slopsquatting)").

## About

`pkgshield` helps identify potentially risky npm packages by checking:

- **New packages** - Packages with recent initial releases that haven't been battle-tested
- **New versions** - Recently published versions that may contain malicious code
- **Unmaintained packages** - Packages that haven't been updated in a long time

## Installation

```bash
npm install -g pkgshield
```

## Usage

Run `pkgshield check` in your project directory to scan all dependencies in your `package.json`:

```bash
pkgshield check
```

### Customizing Thresholds

You can customize the warning thresholds using flags:

```bash
# Check for packages newer than 60 days (default: 30)
pkgshield check --package-age 60

# Check for versions newer than 7 days (default: 2)
pkgshield check --version-age 7

# Check for packages unmaintained for 2 years (default: 365 days)
pkgshield check --unmaintained 730

# Combine multiple flags
pkgshield check --package-age 60 --version-age 7 --unmaintained 730
```

### Available Flags

- `-p, --package-age <days>` - Maximum age in days for package initial release (default: 30)
- `-v, --version-age <days>` - Maximum age in days for installed version (default: 2)
- `-u, --unmaintained <days>` - Maximum age in days since last release to consider unmaintained (default: 365)

## Example Output

```
Checking 18 packages...

=== SECURITY CHECK REPORT ===

⚠️  Found 3 package(s) with warnings:

📦 example-package@1.0.0
   First release: 2025-09-15
   Installed version date: 2025-09-28
   Latest release: 2025-09-28
   ⚠️  Package is too new (17 days old, threshold: 30 days)
   ⚠️  Installed version is too new (4 days old, threshold: 7 days)

✅ 15 package(s) passed all checks

=== END REPORT ===
```

## How It Works

1. Reads your `package.json` and `package-lock.json` files
2. Fetches package metadata from the npm registry
3. Compares release dates against configurable thresholds
4. Reports packages that meet any warning criteria

## License

MIT
