const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

async function getFileSizes() {
    const folderUri = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const files = fs.readdirSync(folderUri);
    const fileSizes = [];

    for (const file of files) {
        const filePath = path.join(folderUri, file);
        const stats = fs.statSync(filePath);

        if (stats.isFile()) {
            fileSizes.push({ path: filePath, size: stats.size });
        }
    }

    return fileSizes;
}

module.exports = {
    getFileSizes
};
