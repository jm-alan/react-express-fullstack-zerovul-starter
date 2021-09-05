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
    'socket.io': 'commonjs socket.io',
    sequelize: 'commonjs sequelize',
    express: 'commonjs express',
    dotenv: 'commonjs dotenv',
    cors: 'commonjs cors',
    morgan: 'commonjs morgan'
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
