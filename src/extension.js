const vscode = require('vscode');
const { FileSizeProvider } = require('./fileSizeProvider');

function activate(context) {
    const fileSizeProvider = new FileSizeProvider();
    context.subscriptions.push(fileSizeProvider);

    context.subscriptions.push(vscode.commands.registerCommand('fileSizeMonitor.sortBySize', () => {
        fileSizeProvider.setSortOrder('size');
        vscode.window.showInformationMessage('Files sorted by size.');
    }));

    context.subscriptions.push(vscode.commands.registerCommand('fileSizeMonitor.sortByName', () => {
        fileSizeProvider.setSortOrder('name');
        vscode.window.showInformationMessage('Files sorted by name.');
    }));

    context.subscriptions.push(vscode.commands.registerCommand('fileSizeMonitor.filterJS', () => {
        fileSizeProvider.setFileFilter(['.js']);
        vscode.window.showInformationMessage('Showing only .js files.');
    }));

    context.subscriptions.push(vscode.commands.registerCommand('fileSizeMonitor.clearFilter', () => {
        fileSizeProvider.setFileFilter([]);
        vscode.window.showInformationMessage('File filter cleared.');
    }));
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
