const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: {
    index: './src/client/index.tsx'
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            // 缓存上次编译结果，避免每次重新编译，减少打包时间
            cacheDirectory: true
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.img$/,
        use: 'url-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: './webBuild/template/images', to: 'images' }
      ]
    })
  ],
  resolve: {
    extensions: ['.tsx', '.js', '.ts']
  }
};
