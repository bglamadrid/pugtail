const path = require('path');
const PugPlugin = require('pug-plugin');
const baseConfig = require('./webpack.config.base');

module.exports = {
  ...baseConfig,
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
      extractCss: {
        filename: 'styles/[name].[contenthash:8].css'
      }
    })
  ],
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.pug$/,
        loader: PugPlugin.loader,
        options: {
          esModule: true,
          data: {
            environment: require('./src/environment.json'),
            site: require('./src/site.json'),
            business: require('./src/business.json')
          }
        }
      }
    ]
  }
};
