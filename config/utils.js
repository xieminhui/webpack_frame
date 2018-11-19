'use strict'
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//动态查找所有入口
exports.getEntries = function () {
   var files = glob.sync('./src/page/*/index.js');
   var newEntries = {}, HtmlWebpackPluginConfig = [];

   files.forEach(function (f) {
      var name = /.*\/(page\/.*?\/index)\.js/.exec(f)[1]; //得到src/page/index这样的文件名
      newEntries[name] = f;
      var plug =  new HtmlWebpackPlugin({
         filename: resolve('/dist/'+ name +'.html'),
         chunks: [name],
         template: resolve('/public/src/index.html'),
         inject: true
     });
     HtmlWebpackPluginConfig.push(plug);
   });
   return {
      newEntries,
      HtmlWebpackPluginConfig
   }
}

 exports.resolve = function (dir) {
   return path.join(__dirname, '..', dir)
 }