const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].prod-bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  plugins: [new CompressionPlugin()],
});
