# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**pkgshield** is a CLI tool built with [oclif](https://oclif.io) to protect supply chain security. This is an ES module project (type: "module" in package.json) using TypeScript with Node16 module resolution.

## Development Commands

### Build

```bash
npm run build
```

Removes the `dist/` directory and compiles TypeScript to JavaScript.

### Testing

```bash
# Run all tests
npm test

# Run a specific test file
npm test -- test/commands/hello/index.test.ts
```

Tests use Mocha with Chai assertions. Test files use `@oclif/test`'s `runCommand` helper for integration testing commands.

### Linting

```bash
npm run lint
```

ESLint runs automatically after tests (posttest hook).

### Local Development

```bash
./bin/dev.js COMMAND
```

Run commands locally without building (uses ts-node).

### Prepare for Publishing

```bash
npm run prepack
```

Generates `oclif.manifest.json` and updates README.md with command documentation.

## Architecture

### Command Structure

Commands follow oclif's file-based routing in `src/commands/`. Each file exports a default class extending `Command` from `@oclif/core`.

- Command classes define static `args`, `flags`, `description`, and `examples`
- The `run()` method contains command logic
- Nested commands create topic groups (e.g., `hello/index.ts` + `hello/world.ts`)

### Build Output

- Source: `src/**/*.ts`
- Compiled: `dist/**/*.js` + type declarations
- Entry point: `dist/index.js` (exports `run` from `@oclif/core`)
- Binary: `bin/run.js` (production) and `bin/dev.js` (development)

### oclif Configuration

The `oclif` section in package.json configures:

- Command directory: `./dist/commands`
- Plugins: `@oclif/plugin-help`, `@oclif/plugin-plugins`
- Topics: Groupings for command organization (currently "hello")
