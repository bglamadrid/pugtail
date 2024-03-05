const path = require('path');

module.exports = {
  entry: {
    index: './src/web/views/index.pug'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      Images: path.join(__dirname, './src/images'),
      Scripts: path.join(__dirname, './src/web/scripts'),
      Views: path.join(__dirname, './src/web/views')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /styles\.css$/,
        use: [
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|webp|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name].[hash:8][ext]'
        }
      },
      {
        test: /favicon\.ico$/,
        type: 'asset/resource',
        generator: {
          filename: 'favicon.ico'
        }
      }
    ]
  }
};
