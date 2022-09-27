const path = require('path');
const PugPlugin = require('pug-plugin');
const baseConfig = require('./webpack.config.base');
const { NormalModuleReplacementPlugin } = require('webpack');

module.exports = Object.assign(
  baseConfig,
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
        extractCss: {
          filename: 'styles/[name].[contenthash:8].css'
        }
      }),
      // for client-side javascript
      new NormalModuleReplacementPlugin(
        /\.\.\/environment/,
        '../environment.prod.js'
      )
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
              environment: require('./src/environment.prod.js') // for pug templates
            }
          }
        }
      ]
    }
  }
);
