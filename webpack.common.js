const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: [
    './src/assets/js/main.js',
    './src/assets/css/main.css'
  ],
  module: {
    rules: [
      {
        test: /\.(js|vue|jsx)$/,
        use: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          interpolate: true
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(`${__dirname}/dist/assets`),
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: `${__dirname}/postcss.config.js`
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: function (url) {
                return url.replace(/assets/, '..')
              }
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/fonts/[name].[ext]',
              publicPath: function (url) {
                return url.replace(/assets/, '..')
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      lib: path.resolve(__dirname, 'src/assets/js/lib'),
      app: path.resolve(__dirname, 'src/assets/js/app'),
      modules: path.resolve(__dirname, 'src/modules'),
      components: path.resolve(__dirname, 'src/components'),
      fonts: path.join(__dirname, 'src/assets/fonts'),
      images: path.join(__dirname, 'src/assets/images'),
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/layouts/index.html',
      filename: 'index.html'
    }),
    new VueLoaderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
