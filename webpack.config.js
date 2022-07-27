const path = require('path');
const PugPlugin = require('pug-plugin');
const { NormalModuleReplacementPlugin } = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/views/index.pug'
  },
  output: {
    filename: 'scripts/[name].[contenthash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      Images: path.join(__dirname, './src/images'),
      Scripts: path.join(__dirname, './src/scripts'),
      Views: path.join(__dirname, './src/views')
    }
  },
  plugins: [
    new PugPlugin({
      modules: [
        PugPlugin.extractCss({
          filename: 'styles/[name].[contenthash:8].css'
        })
      ]
    }),
    // TODO can (or should) this replacement plugin be refactored to use an absolute path like /src/?
    new NormalModuleReplacementPlugin(
      /\.\.\/environment/,
      '../environment.prod.ts'
    )
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.pug$/,
        loader: PugPlugin.loader,
        options: {
          method: 'render'
        }
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
