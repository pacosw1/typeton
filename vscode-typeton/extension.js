const vscode = require('vscode');
const { spawn } = require('child_process');
const path = require('path');
const { LanguageClient, TransportKind } = require('vscode-languageclient/node');

let outputChannel;
let languageClient;

/**
 * Activate the extension and register the compile/run commands.
 */
function activate(context) {
    outputChannel = vscode.window.createOutputChannel('Typeton CLI');
    context.subscriptions.push(outputChannel);

    const runCommand = vscode.commands.registerCommand('typeton.run', () => runTypetonCommand('run'));
    const compileCommand = vscode.commands.registerCommand('typeton.compile', () => runTypetonCommand('compile'));
    context.subscriptions.push(runCommand, compileCommand);

    const serverModule = context.asAbsolutePath(path.join('server', 'out', 'server.js'));
    const serverOptions = {
        run: { module: serverModule, transport: TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: TransportKind.ipc,
            options: {
                execArgv: ['--nolazy', '--inspect=6009']
            }
        }
    };

    const clientOptions = {
        documentSelector: [{ scheme: 'file', language: 'typeton' }],
        synchronize: {
            fileEvents: vscode.workspace.createFileSystemWatcher('**/*.ty')
        }
    };

    languageClient = new LanguageClient(
        'typetonLanguageServer',
        'Typeton Language Server',
        serverOptions,
        clientOptions
    );
    context.subscriptions.push(languageClient.start());
}

/**
 * Compile or run the currently active Typeton document.
 */
async function runTypetonCommand(action) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage('Open a Typeton file before running this command.');
        return;
    }

    const document = editor.document;
    if (!document.fileName.endsWith('.ty') && document.languageId !== 'typeton') {
        vscode.window.showInformationMessage('Typeton commands only operate on .ty files.');
        return;
    }

    if (document.isDirty) {
        const saved = await document.save();
        if (!saved) {
            vscode.window.showInformationMessage('Save cancelled; Typeton command aborted.');
            return;
        }
    }

    const cwd = getWorkspaceDirectory(document);
    const args = action === 'run'
        ? ['run', document.uri.fsPath]
        : ['compile', document.uri.fsPath];

    const child = spawn('typeton', args, { cwd, shell: true });

    outputChannel.appendLine('');
    outputChannel.appendLine(`> typeton ${args.join(' ')}`);
    outputChannel.show(true);

    child.stdout.on('data', (chunk) => {
        outputChannel.append(chunk.toString());
    });

    child.stderr.on('data', (chunk) => {
        outputChannel.append(chunk.toString());
    });

    child.on('error', (error) => {
        outputChannel.appendLine('');
        outputChannel.appendLine(`Failed to invoke typeton: ${error.message}`);
        vscode.window.showErrorMessage('Unable to run the Typeton CLI. Confirm it is installed and on your PATH.');
    });

    child.on('close', (code) => {
        outputChannel.appendLine('');
        outputChannel.appendLine(`Process exited with code ${code}`);
    });
}

function getWorkspaceDirectory(document) {
    const folder = vscode.workspace.getWorkspaceFolder(document.uri);
    if (folder) {
        return folder.uri.fsPath;
    }
    return path.dirname(document.uri.fsPath);
}

function deactivate() {
    if (!languageClient) {
        return undefined;
    }
    return languageClient.stop();
}

module.exports = {
    activate,
    deactivate
};
