#!/bin/bash

# Typeton - Install CLI globally

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Create symlink in /usr/local/bin
sudo ln -sf "$SCRIPT_DIR/typeton" /usr/local/bin/typeton

echo "✅ Typeton CLI installed!"
echo "Usage: typeton <file.ty>"
echo ""
echo "Try it:"
echo "  typeton programs/memory_test.ty"
