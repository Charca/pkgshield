nopkg
=================

A CLI tool to protect your supply chain security


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/nopkg.svg)](https://npmjs.org/package/nopkg)
[![Downloads/week](https://img.shields.io/npm/dw/nopkg.svg)](https://npmjs.org/package/nopkg)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g nopkg
$ nopkg COMMAND
running command...
$ nopkg (--version)
nopkg/0.0.0 darwin-arm64 node-v22.14.0
$ nopkg --help [COMMAND]
USAGE
  $ nopkg COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`nopkg hello PERSON`](#nopkg-hello-person)
* [`nopkg hello world`](#nopkg-hello-world)
* [`nopkg help [COMMAND]`](#nopkg-help-command)
* [`nopkg plugins`](#nopkg-plugins)
* [`nopkg plugins add PLUGIN`](#nopkg-plugins-add-plugin)
* [`nopkg plugins:inspect PLUGIN...`](#nopkg-pluginsinspect-plugin)
* [`nopkg plugins install PLUGIN`](#nopkg-plugins-install-plugin)
* [`nopkg plugins link PATH`](#nopkg-plugins-link-path)
* [`nopkg plugins remove [PLUGIN]`](#nopkg-plugins-remove-plugin)
* [`nopkg plugins reset`](#nopkg-plugins-reset)
* [`nopkg plugins uninstall [PLUGIN]`](#nopkg-plugins-uninstall-plugin)
* [`nopkg plugins unlink [PLUGIN]`](#nopkg-plugins-unlink-plugin)
* [`nopkg plugins update`](#nopkg-plugins-update)

## `nopkg hello PERSON`

Say hello

```
USAGE
  $ nopkg hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ nopkg hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/Charca/nopkg/blob/v0.0.0/src/commands/hello/index.ts)_

## `nopkg hello world`

Say hello world

```
USAGE
  $ nopkg hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ nopkg hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/Charca/nopkg/blob/v0.0.0/src/commands/hello/world.ts)_

## `nopkg help [COMMAND]`

Display help for nopkg.

```
USAGE
  $ nopkg help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for nopkg.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.33/src/commands/help.ts)_

## `nopkg plugins`

List installed plugins.

```
USAGE
  $ nopkg plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ nopkg plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.48/src/commands/plugins/index.ts)_

## `nopkg plugins add PLUGIN`

Installs a plugin into nopkg.

```
USAGE
  $ nopkg plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into nopkg.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the NOPKG_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the NOPKG_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ nopkg plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ nopkg plugins add myplugin

  Install a plugin from a github url.

    $ nopkg plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ nopkg plugins add someuser/someplugin
```

## `nopkg plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ nopkg plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ nopkg plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.48/src/commands/plugins/inspect.ts)_

## `nopkg plugins install PLUGIN`

Installs a plugin into nopkg.

```
USAGE
  $ nopkg plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into nopkg.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the NOPKG_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the NOPKG_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ nopkg plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ nopkg plugins install myplugin

  Install a plugin from a github url.

    $ nopkg plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ nopkg plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.48/src/commands/plugins/install.ts)_

## `nopkg plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ nopkg plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ nopkg plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.48/src/commands/plugins/link.ts)_

## `nopkg plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ nopkg plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ nopkg plugins unlink
  $ nopkg plugins remove

EXAMPLES
  $ nopkg plugins remove myplugin
```

## `nopkg plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ nopkg plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.48/src/commands/plugins/reset.ts)_

## `nopkg plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ nopkg plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ nopkg plugins unlink
  $ nopkg plugins remove

EXAMPLES
  $ nopkg plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.48/src/commands/plugins/uninstall.ts)_

## `nopkg plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ nopkg plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ nopkg plugins unlink
  $ nopkg plugins remove

EXAMPLES
  $ nopkg plugins unlink myplugin
```

## `nopkg plugins update`

Update installed plugins.

```
USAGE
  $ nopkg plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.48/src/commands/plugins/update.ts)_
<!-- commandsstop -->
