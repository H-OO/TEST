const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const extractCSS = new ExtractTextPlugin('[name]-one.css');
const extractSASS = new ExtractTextPlugin('[name]-two.css');

module.exports = {
  mode: 'production', // [development|production] 4.0新特性
  // devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    // hot: true // 【HMR】
  },
  entry: {
    index: './src/main.js',
    vendor: ['lodash'] // 第三方
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015'] // ES6 转 ES5
          }
        }
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.css$/,
        use: extractCSS.extract(['css-loader', 'postcss-loader'])
      },
      {
        test: /\.sass$/,
        use: extractSASS.extract([
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ])
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: '3072',
            name: 'img/[name].[hash].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    // new ExtractTextPlugin('style_all.css'), // 单实例
    extractCSS,
    extractSASS,
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'test',
      filename: 'index.html', // 输出文件名
      template: path.join(__dirname, 'src/index.html'), // 使用的模板文件
      inject: 'body', // 插入body标签底部
      chunks: ['index', 'vendor'], // 插入scripts标签 引入打包后的js
      hash: true, // 文件名添加hash字符串
      minify: {
        // 压缩html
        removeAttributeQuotes: true, // 移除属性的引号
        removeComments: true, // 移除注释
        collapseWhitespace: true // 移除空格
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin() // 【HMR】
  ],
  // webpack4 新特性
  optimization: {
    splitChunks: {
      cacheGroups: {
        index: {
          chunks: 'initial',
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0 // This is example is too small to create commons chunks
        },
        vendor: {
          test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					priority: 10,
					enforce: true
        }
      }
    }
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
