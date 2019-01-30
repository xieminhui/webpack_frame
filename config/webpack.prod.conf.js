'use strict'
const config = require('./config')
const utils = require('./utils')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
   mode: 'development',
   module: {
      rules: utils.styleLoaders({
         sourceMap: config.build.productionSourceMap,
         extract: true,
         usePostCSS: true
      })
   },
   devtool: config.build.productionSourceMap ? config.build.devtool : false,
   output: {
     path: config.build.assetsRoot,
     filename: path.join(config.build.assetsSubDirectory, 'js/[name].[chunkhash].js'),
     chunkFilename: path.join(config.build.assetsSubDirectory, 'js/[id].[chunkhash].js')
   },
   plugins: [
      ...utils.getEntries().map(v => {
         return new ExtractTextPlugin({filename: utils.resolve(`/css/${v}[name].[contenthash].css`), allChunks: true});
      }),
      new UglifyJsPlugin({
         uglifyOptions: {
            compress: {
               warnings: false,
            },
            sourceMap: config.build.productionSourceMap,
            parallel: true
         }
      }),
      new OptimizeCSSPlugin({
         
      })
   ]
}