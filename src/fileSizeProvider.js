const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const { getFileSizes } = require('./fileSizeMonitor');

class FileSizeProvider {
    constructor() {
        this.sortOrder = 'size'; 
        this.filterExtensions = []; 
        this.refresh();
    }

    refresh() {
        this._view = vscode.window.createTreeView('fileSizeMonitorView', {
            treeDataProvider: this
        });
    }

    async getChildren() {
        let sizes = await getFileSizes();

        if (this.filterExtensions.length > 0) {
            sizes = sizes.filter(file => this.filterExtensions.some(ext => file.path.endsWith(ext)));
        }

        sizes = this.sortFiles(sizes);

        return sizes.map(file => new FileSizeItem(file.path, file.size));
    }

    getTreeItem(element) {
        return element;
    }

    sortFiles(files) {
        if (this.sortOrder === 'size') {
            return files.sort((a, b) => b.size - a.size);
        } else if (this.sortOrder === 'name') {
            return files.sort((a, b) => a.path.localeCompare(b.path));
        }
        return files;
    }

    setSortOrder(order) {
        this.sortOrder = order;
        this.refresh();
    }

    setFileFilter(extensions) {
        this.filterExtensions = extensions;
        this.refresh();
    }
}

class FileSizeItem extends vscode.TreeItem {
    constructor(filePath, fileSize) {
        super(filePath, vscode.TreeItemCollapsibleState.None);
        this.label = `${path.basename(filePath)} (${this.formatFileSize(fileSize)})`;
        this.tooltip = filePath;
        this.command = {
            command: 'vscode.open',
            arguments: [vscode.Uri.file(filePath)],
            title: "Open File"
        };
    }

    formatFileSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
}

module.exports = {
    FileSizeProvider
};
