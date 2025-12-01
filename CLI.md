# Typeton CLI

A command-line tool to compile and run Typeton programs.

## Installation

```bash
./install-cli.sh
```

This will install the `typeton` command globally.

## Usage

### Compile and show quads
```bash
typeton programs/memory_test.ty
```

### Compile only
```bash
typeton compile programs/memory_test.ty
```

### Run (compile + execute)
```bash
typeton run programs/memory_test.ty
```

Use `typeton --debug <file>.ty` (or `-d`) to expose the runtime performance statistics that are available at the end of execution.

## Examples

```bash
# Compile a simple program
typeton programs/mvp_test.ty

# Compile types test
typeton programs/types_test.ty

# Compile array test
typeton programs/array_test.ty
```

The default `programs/memory_test.ty` now exercises arrays (`arr[0]`/`arr[1]`, literal initializers, and indexed assignment), so run `typeton programs/memory_test.ty` to verify the entire workflow and see the runtime statistics with `--debug`.

## Output

The compiler will show:
- Generated quads
- Memory addresses used
- Any compilation errors

## Without Installation

You can also run directly:
```bash
./typeton programs/memory_test.ty
```
