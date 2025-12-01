# Typeton VS Code Extension - Troubleshooting

If `.ty` files are not being recognized:

## Option 1: Manual File Association (Recommended)

1. Open any `.ty` file in VS Code
2. Click on the language indicator in the bottom-right corner (it probably says "Plain Text")
3. Type "Typeton" in the search box
4. Select "Typeton" from the list
5. VS Code will remember this association

## Option 2: Add to User Settings

1. Open VS Code Settings (Cmd+, on Mac)
2. Click the "Open Settings (JSON)" icon in the top-right
3. Add this to your settings:

```json
{
  "files.associations": {
    "*.ty": "typeton"
  }
}
```

## Option 3: Reload VS Code

Sometimes VS Code needs a full reload after installing an extension:

1. Press Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows/Linux)
2. Type "Developer: Reload Window"
3. Press Enter

## Verify Extension is Active

1. Press Cmd+Shift+X to open Extensions
2. Search for "typeton"
3. Make sure it shows as "Enabled"

## Check Extension Files

The extension should be installed at:
`~/.vscode/extensions/typeton-0.1.0/`

Verify these files exist:
- `package.json`
- `language-configuration.json`
- `syntaxes/typeton.tmLanguage.json`
