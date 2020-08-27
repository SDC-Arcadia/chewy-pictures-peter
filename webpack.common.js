module.exports = {
  entry: {
    photos: './client/index.jsx',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 'current',
                  },
                },
              ],
              '@babel/preset-react',
            ],
          },
        },
      },
    ],
  },
};
