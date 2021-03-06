// ./webpack.config.js
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const DefinePluginConfig = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
})

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/template.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  devtool: (process.env.NODE_ENV === 'developpement')?'eval':'cheap-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve('./'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(svg|ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.scss$/,
        loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig, DefinePluginConfig,
    new webpack.optimize.AggressiveMergingPlugin()//Merge chunks
  ]
}
