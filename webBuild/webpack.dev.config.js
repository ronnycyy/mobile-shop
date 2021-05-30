const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const devConfig = {
  mode: 'development',
  output: {
    path: path.resolve('./dist/client'),
    filename: '[name].js',
  },
  devServer: {
    hot: true,
    quiet: true,
    // 代理服务器端域名
    proxy: {
      '/': 'http://localhost:80',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './webBuild/template/index.html',
      favicon: './webBuild/template/favicon.ico',
      env: process.env.NODE_ENV,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: ['网站运行在: http://localhost:8080'],
        // notes: ['请使用npm run client:server运行开发环境']
      },
      clearConsole: true,  // 配合devServer.quiet = true，不打印编译信息
      onErrors: function (severity, errors) {
      },
    })
  ]
};

module.exports = merge(baseConfig, devConfig);
