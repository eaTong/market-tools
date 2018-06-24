const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoPrefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const buildPath = path.resolve(__dirname, 'dist');
const webContextRoot = '/';// 应用的实际访问路径，默认是'/'   可以试试/static/
const AppCachePlugin = require('appcache-webpack-plugin');

const mainColor = '#45be89';

function resolve(dir) {
  return path.join(__dirname,  dir)
}

module.exports = {
  devtool: 'cheap-module',
  entry: {
    main: [
      'babel-polyfill',
      './front/index.js'
    ],
    vendor: ['reqwest', 'echarts', 'react', 'react-dom', 'react-router', 'react-router-dom', 'moment']
  },
  output: {
    path: buildPath,
    filename: 'js/[name]_[chunkhash:8].js',
    publicPath: webContextRoot
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '~': resolve('front'),
      'public': resolve('public')
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist', 'build']),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-ca|zh-cn/),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new AppCachePlugin({
      exclude: ["index.html"],
      output: '/manifest.appcache'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      filename: 'vendor.[chunkhash].js',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index-production.html'),
      path: buildPath,
      excludeChunks: ['base'],
      filename: 'index.html',
      time: Date.now(),
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      },
    }),
    new webpack.DefinePlugin({
      process: {
        env: {
          // process.env.NODE_ENV==="production"
          // 应用代码里，可凭此判断是否运行在生产环境
          NODE_ENV: JSON.stringify('production')
        }
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        drop_debugger: true,
        drop_console: true
      },
      output: {
        comments: false
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin("styles-[contenthash].css"),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true || {/* CSSNano Options */}
              }
            }, {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [autoPrefixer]
              }
            }]
        })
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true || {/* CSSNano Options */}
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [autoPrefixer]
              }
            }, {
              loader: 'less-loader',
              options: {
                modifyVars: {"primary-color": mainColor}
              }
            }
          ]
        })
      }, {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
            name: '[name]_[hash:8].[ext]'
          }
        }

      }, {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
            mimetype: 'application/font-woff',
            name: '[name]_[hash:8].[ext]'
          }
        }
      }
    ]
  }
};
