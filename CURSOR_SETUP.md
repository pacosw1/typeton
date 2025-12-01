# Typeton Syntax Highlighting for Cursor IDE

Since you're using Cursor/Antigravity IDE, the easiest way to get syntax highlighting is to use the built-in file associations.

## Quick Setup

Add this to your Cursor settings:

1. Press `Cmd+,` to open Settings
2. Search for "files associations"
3. Click "Edit in settings.json"
4. Add:

```json
{
  "files.associations": {
    "*.ty": "typescript"
  }
}
```

## Or use the settings.json file I created

I've created a `typeton-settings.json` file in your project root. 

**To use it:**

1. Open Cursor Settings (JSON) with `Cmd+Shift+P` → "Preferences: Open User Settings (JSON)"
2. Copy the contents from `typeton-settings.json` into your settings
3. Save and reload

## What you'll get

Using TypeScript syntax highlighting for `.ty` files gives you:
- ✅ Keyword highlighting (`var`, `const`, etc.)
- ✅ Type highlighting (`Int32`, `Float`, etc.)
- ✅ Number and string highlighting  
- ✅ Operator highlighting (`+`, `-`, `*`, `/`, `=`)
- ✅ Auto-closing brackets and parentheses
- ✅ Comment support (`//`)

This is good enough for development and works immediately in Cursor!

## Alternative: TextMate Grammar

If you want custom Typeton highlighting in Cursor, you can:

1. Create a custom TextMate grammar in Cursor's settings
2. Use the grammar from `vscode-typeton/syntaxes/typeton.tmLanguage.json`

But the TypeScript association is simpler and works great.
