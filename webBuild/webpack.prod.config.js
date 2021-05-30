const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const prodConfig = {
  mode: 'production',
  output: {
    path: path.resolve('./dist/client'),
    filename: 'moble-shop-[name]-[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'moble-shop-[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: './webBuild/template/index.html',
      favicon: './webBuild/template/favicon.ico',
      env: process.env.NODE_ENV
    }),
    
  ]
};

module.exports = merge(baseConfig, prodConfig);
