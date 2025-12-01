# Typeton VS Code Extension

Syntax highlighting and language support for the Typeton programming language.

## Features

- **Syntax Highlighting**: Full syntax highlighting for Typeton code
- **Auto-closing**: Automatic closing of brackets, parentheses, and quotes
- **Comment Support**: Line comments with `//`
- **Type Recognition**: Highlights `Int32`, `Int16`, `UInt8`, `Float`

## Commands

- **Typeton: Compile Program** — invokes the installed `typeton` CLI to compile the active `.ty` file and emits the compiler output to the `Typeton CLI` output channel.
- **Typeton: Run Program** — compiles and executes the active file via the CLI; runtime behavior appears in the same output channel. Use the CLI manually with `--debug` (or `-d`) when you need the runtime performance stats output.
These commands also appear as buttons in the editor title bar when a `.ty` file is active so you can trigger them without opening the Command Palette.

Both commands require the `typeton` CLI to be available on your system `PATH` (see the root `typeton` CLI documentation or run `./install-cli.sh`).

## IntelliSense

This release also registers a basic completion provider for `.ty` files, so the editor will suggest the most common keywords and built-in types as you type. The provider is lightweight and always-on while the extension is active.

## Installation

### From Source

1. Copy the `vscode-typeton` folder to your VS Code extensions directory:
   - **macOS/Linux**: `~/.vscode/extensions/`
   - **Windows**: `%USERPROFILE%\.vscode\extensions\`

2. Restart VS Code

3. Open any `.ty` file to see syntax highlighting

### Development

To work on the extension:

```bash
cd vscode-typeton
code .
```

Press `F5` to launch Extension Development Host.

## Supported Syntax

```typeton
// Variables with types
var x: Int32 = 42;
var y: Float = 3.14;

// Arithmetic
var sum: Int32 = x + 10;

// Print
print(sum);
```

## File Extension

Typeton files use the `.ty` extension.

## License

MIT
