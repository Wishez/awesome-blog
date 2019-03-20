'use strict'

const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const nodeExternals = require('webpack-node-externals')

const env = config.build.env

const webpackConfig = {
  target: 'node',
  // Это позволяет Webpack обрабатывать динамические импорты в Node-стиле,
  // а также сообщает `vue-loader` генерировать серверно-ориентированный код
  // при компиляции компонентов Vue.
  target: 'node',

  // Для поддержки source map в bundle renderer
  devtool: 'source-map',

  entry: { serverBundle: './src/entry-server.js' },
  // Это сообщает что в серверной сборке следует использовать экспорты в стиле Node
  output: {
    path: config.server.assetsRoot,
    libraryTarget: 'commonjs2',
  },

  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // Внешние зависимости приложения. Это значительно ускоряет процесс
  // сборки серверной части и уменьшает размер итогового файла сборки.
  externals: nodeExternals({
    // не выделяйте зависимости, которые должны обрабатываться Webpack.
    // здесь вы можете добавить больше типов файлов, например сырые *.vue файлы
    // нужно также указывать белый список зависимостей изменяющих `global` (например, полифиллы)
    whitelist: /\.css$/
  }),

  module: baseWebpackConfig.module,
  resolve: { 
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'vue/dist/vue.js',
      '@': path.join(__dirname, '..', 'src'),
    }
  },
  plugins: [
    // Этот плагин преобразует весь результат серверной сборки
    // в один JSON-файл. Имя по умолчанию будет
    // `vue-ssr-server-bundle.json`
    new VueSSRServerPlugin(),

    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env,
      'VUE_ENV': 'server',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru|en/),
    new webpack.ProvidePlugin({
      Cookies: "js-cookie",
      localforage: 'localforage'
    }),
  ].concat(baseWebpackConfig.plugins)
}

module.exports = webpackConfig
