'use strict'
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

//动态查找所有入口
exports.getEntries = function (type) {
   var files = glob.sync('./src/page/*/index.js');
   var newEntries = [];
console.log(files)
   files.forEach(function (f) {
      var result = /\/page\/(.*?)\/index\.js/.exec(f);
      var name = type === "css"?result[1]: result[0]; //page/pagea/index
      newEntries.push(name);
   });
   return newEntries;
}
getEntries();
exports.resolve = function (dir) {
   return path.join(__dirname, '..', dir)
}
exports.cssLoaders = function (options) {
   options = options || {}

   const cssLoader = {
      loader: 'css-loader',
      options: {
         sourceMap: options.sourceMap
      }
   }

   const postcssLoader = {
      loader: 'postcss-loader',
      options: {
         sourceMap: options.sourceMap
      }
   }

   // generate loader string to be used with extract text plugin
   function generateLoaders(loader, loaderOptions) {
      const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

      if (loader) {
         loaders.push({
            loader: loader + '-loader',
            options: Object.assign({}, loaderOptions, {
               sourceMap: options.sourceMap
            })
         })
      }

      // Extract CSS when that option is specified
      // (which is the case during production build)
      if (options.extract) {
         if (options.multiplePages) {
            return exports.getEntries().map(v => {
               new ExtractTextPlugin().extract({
                  test: loader ? new RegExp(`src(\/|\\\\)${v}]\.${loader}$`): new RegExp(`src(\/|\\\\)${v}]\.css$`),
                  use: loaders,
                  fallback: 'vue-style-loader'  
               })
            })
         }
         return ExtractTextPlugin.extract({
            use: loaders,
            fallback: 'vue-style-loader'
         })
      } else {
         return ['vue-style-loader'].concat(loaders)
      }
   }

   // https://vue-loader.vuejs.org/en/configurations/extract-css.html
   return {
      css: generateLoaders(),
      postcss: generateLoaders(),
      less: generateLoaders('less'),
      sass: generateLoaders('sass', {
         indentedSyntax: true
      }),
      scss: generateLoaders('sass'),
      stylus: generateLoaders('stylus'),
      styl: generateLoaders('stylus')
   }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
   const output = []
   const loaders = exports.cssLoaders(options)

   for (const extension in loaders) {
      const loader = loaders[extension]
      output.push({
         test: new RegExp('\\.' + extension + '$'),
         use: loader
      })
   }

   return output
}