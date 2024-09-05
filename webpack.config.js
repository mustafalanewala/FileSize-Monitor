const path = require('path');

module.exports = {
  mode: 'development',  // Change this to 'production' for optimized builds
  entry: './src/extension.js',
  output: {
    filename: 'extension.js',
    path: path.resolve(__dirname, 'out'),
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  externals: {
    vscode: 'commonjs vscode'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
