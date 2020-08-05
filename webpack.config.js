const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    photos: './client/index.jsx',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    publicPath: path.join(__dirname, 'public'),
    port: 9000
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets:['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};