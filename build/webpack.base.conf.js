'use strict'

const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack  = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    app: './src/main.js',
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // важно: использовать vue-style-loader вместо style-loader
        use: isProduction
          ? ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader'
            })
          : ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          fix: true
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      generateStatsFile: true,
      openAnalyzer: false,
      logLevel: 'info'
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru|en/),
    new webpack.ProvidePlugin({
      // moment: 'moment-timezone',
      Cookies: "js-cookie",
      localforage: 'localforage'
    }),
  ]
}
