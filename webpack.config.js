const path = require('path');
const webpack = require('webpack');
const autoPrefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mainColor = '#45be89';
const buildPath = path.resolve(__dirname, 'static');

function resolve(dir) {
  return path.join(__dirname,  dir)
}


module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './front/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '~': resolve('front'),
      'public': resolve('public')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      DEBUG_ENV: JSON.stringify(process.env.DEBUG_ENV),
      PUBLISH_TIME: new Date().getTime(),
      URL_PREFIX: JSON.stringify('/api'),
      MAIN_COLOR: JSON.stringify(mainColor),
      process: {
        env: {
          // process.env.NODE_ENV==="production"
          // 应用代码里，可凭此判断是否运行在生产环境
          NODE_ENV: JSON.stringify('development')
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      path: buildPath,
      excludeChunks: ['base'],
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: false
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [autoPrefixer]
            }
          }]
      }, {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [autoPrefixer]
            }
          }, {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              modules: false,
              modifyVars: {"primary-color": mainColor}
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
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
