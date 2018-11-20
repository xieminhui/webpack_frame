'use strict'
const baseWebpackConfig = require('./webpack.base.conf')
const utils = require('./utils')
const config = require('./config')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')



module.exports = merge(baseWebpackConfig, {
   mode: 'development',
   module: {
      rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCss: true}),
      devtool: config.dev.devtool,
      devServer: {
         
      }
   }
})