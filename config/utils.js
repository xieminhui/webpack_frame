'use strict'

//动态查找所有入口
exports.getEntries = function () {
   var files = glob.sync('./src/page/*/index.js');
   var newEntries = {};

   files.forEach(function (f) {
      var name = /.*\/(page\/.*?\/index)\.js/.exec(f)[1]; //得到apps/question/index这样的文件名
      newEntries[name] = f;
   });
}

 exports.resolve = function (dir) {
   return path.join(__dirname, '..', dir)
 }