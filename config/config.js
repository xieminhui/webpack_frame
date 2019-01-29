'use strict'
const  path  = require('path')

module.exports = {
   multiplePages:true,//多页面多入口
   dev: {
      assetsSubDirectory: 'static',
      cssSourceMap: true,
      host: 'localhost',
      port: 8080,
      proxyTable: {},
      devtool: 'cheap-module-eval-source-map',
      host: 'localhost',
      port: 8080,
   },
   build: {
      assetsSubDirectory: 'static',
      productionSourceMap: true,
      devtool: '#source-map',
      assetsRoot: path.resolve(__dirname, '../dist')
   }
}