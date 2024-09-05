const vscode = require('vscode');
const path = require('path');
const { getFileSizes } = require('./fileSizeMonitor');

class FileSizeProvider {
    constructor() {
        this._view = vscode.window.createTreeView('fileSizeMonitorView', {
            treeDataProvider: this
        });
    }

    async getChildren() {
        const sizes = await getFileSizes();
        return sizes.map(file => new FileSizeItem(file.path, file.size));
    }

    getTreeItem(element) {
        return element;
    }
}

class FileSizeItem extends vscode.TreeItem {
    constructor(filePath, fileSize) {
        super(filePath, vscode.TreeItemCollapsibleState.None);
        this.fileSize = fileSize;
        this.label = `${path.basename(filePath)} (${fileSize} bytes)`;
    }
}

module.exports = {
    FileSizeProvider
};
