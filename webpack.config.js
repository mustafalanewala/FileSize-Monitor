const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

module.exports = {
    entry: './src/extension.js',
    target: 'node',
    output: {
        filename: 'extension.js',
        path: path.resolve(__dirname, 'out')
    },
    resolve: {
        extensions: ['.js']
    },
    externals: {
        vscode: 'commonjs vscode'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
};
