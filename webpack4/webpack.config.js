const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name]-one.css');
module.exports = {
  mode: 'development', // development | production
  devServer: {
    contentBase: './dist' // 监听该目录
  },
  entry: {
    main: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        use: extractCSS.extract(['css-loader', 'postcss-loader'])
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 输出文件名
      template: path.resolve(__dirname, 'src/index.html'), // 模板路径
      chunks: ['main'], // 指定所需的js
      inject: 'body' // 将js注入body标签
    }),
    extractCSS
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
