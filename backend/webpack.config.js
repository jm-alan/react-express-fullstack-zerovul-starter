const { resolve } = require('path');

module.exports = {
  entry: {
    index: './bin/www'
  },
  output: {
    path: resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'node',
  externalsPresets: { node: true },
  node: {
    __dirname: false,
    __filename: false
  },
  externals: {
    sequelize: 'commonjs sequelize',
    'socket.io': 'commonjs socket.io',
    express: 'commonjs express'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: '@sucrase/webpack-loader',
          options: {
            transforms: ['imports']
          }
        }
      }
    ]
  }
};
