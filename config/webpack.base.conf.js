'use  strict'
const path = require('path')
const utils = require('./utils')
const config = require('./config');
const vueLoaderConfig = require('./vue-loader.conf')

const env = process.env.NODE_ENV; 
module.exports = {
   context: path.resolve(__dirname, '../'),
   entry: utils.getEntries().map(v => {return `../src/${v}.js`}),
   output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js',
   },
   resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
         '@': utils.resolve('src/components')
      }
   },
   module: {
      rules: [
         {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoaderConfig
         },
         {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
         },
         {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
               limit: 10000,
               name(file){
                  if(env === 'production') {
                     return config.build.assetsSubDirectory + '/[name].[hash:7].[ext]';
                  } else if(env === "development") {
                     return config.dev.assetsSubDirectory + '/[name].[hash:7].[ext]';
                  }
               }
            }
         },
         {
            test: /\.(mp4|webm|ogg|mp3|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
               limit: 10000,
               name(file){
                  if(env === 'production') {
                     return config.build.assetsSubDirectory + '/media/[name].[hash:7].[ext]';
                  } else if(env === "development") {
                     return config.dev.assetsSubDirectory + '/media/[name].[hash:7].[ext]';
                  }
               }
            }
         },
         {
            test: /\.(eot|woff2?|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
               limit: 10000,
               name(file){
                  if(env === 'production') {
                     return config.build.assetsSubDirectory + '/fonts/[name].[hash:7].[ext]';
                  } else if(env === "development") {
                     return config.dev.assetsSubDirectory + '/fonts/[name].[hash:7].[ext]';
                  }
               }
            }
         }
      ]
   },
   plugins: [
      ...utils.getEntries().map(v => {
         var plug =  new HtmlWebpackPlugin({
            filename: utils.resolve('/dist/'+ v +'.html'),
            chunks: [utils.resolve('/src/' + v +'.js')],
            template: utils.resolve(v +'/index.html'),
            inject: true
        });   
         return plug;
      }),
   ]
}