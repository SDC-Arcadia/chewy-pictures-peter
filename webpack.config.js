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
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', {
              targets: {
                node: 'current',
              },
            }],
          },
        },
      },
    ],
  },
};
