#!/bin/bash

# Install Typeton VS Code Extension

VSCODE_EXT_DIR="$HOME/.vscode/extensions/typeton-0.1.0"
CURSOR_EXT_DIR="$HOME/.cursor/extensions/typeton-0.1.0"

echo "Installing Typeton VS Code Extension..."

# Ensure the extension dependencies are present so the language server can activate.
(cd vscode-typeton && npm install --production --ignore-scripts) >/dev/null

# Install for both VS Code and Cursor (Cursor shares the same extension layout).
for target_dir in "$VSCODE_EXT_DIR" "$CURSOR_EXT_DIR"; do
    mkdir -p "$target_dir"
    cp -r vscode-typeton/* "$target_dir/"
    echo "✓ Extension installed to: $target_dir"
done

echo ""
echo "Restart VS Code or Cursor to activate the extension."
echo "Open any .ty file to see syntax highlighting!"
