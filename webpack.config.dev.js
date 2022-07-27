const path = require('path');
const PugPlugin = require('pug-plugin');
const config = require('./webpack.config');

module.exports = Object.assign(
  config,
  {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      static: './dist',
    },
    output: {
      filename: 'scripts/[name].[contenthash:8].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      clean: true
    },
    plugins: [
      new PugPlugin({
        modules: [
          PugPlugin.extractCss({
            filename: 'styles/[name].[contenthash:8].css'
          })
        ]
      })
    ],
  }
);
