'use strict'

module.exports = {
   multiplePages:true,//多页面多入口
   dev: {
      assetsSubDirectory: 'static',
      cssSourceMap: true,
      host: 'localhost',
      port: 8080,
      devtool: 'cheap-module-eval-source-map',

   },
   build: {
      assetsSubDirectory: 'static',
      productionSourceMap: true,
      devtool: '#source-map',

   }
}