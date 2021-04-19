/*
 * @Author: zhujian1995@outlook.com
 * @Date: 2021-04-16 14:36:14
 * @LastEditors: zhujian
 * @LastEditTime: 2021-04-19 11:07:08
 * @Description: 你 kin 你擦
 */
const { merge } = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              //配置选项和插件
              postcssOptions: {
                plugins: [
                  autoprefixer(['last 2 version', '> 1%', 'not ie < 11']),
                  pxtorem({
                    rootValue: 16,
                    unitPrecision: 5,
                    propList: [
                      'font',
                      'font-size',
                      'line-height',
                      'letter-spacing',
                      'width',
                      'height',
                      'margin',
                      'padding',
                    ],
                    selectorBlackList: [],
                    replace: true,
                    mediaQuery: false,
                    minPixelValue: 0,
                    exclude: /node_modules/i,
                  }),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 5000,
  },
});
