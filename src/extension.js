const vscode = require('vscode');
const { FileSizeProvider } = require('./fileSizeProvider');

function activate(context) {
    const fileSizeProvider = new FileSizeProvider();
    context.subscriptions.push(fileSizeProvider);

    let disposable = vscode.commands.registerCommand('fileSizeMonitor.showSizes', async function () {
        vscode.window.showInformationMessage('File Sizes can be viewed in the "File Sizes" view in the Explorer.');
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
