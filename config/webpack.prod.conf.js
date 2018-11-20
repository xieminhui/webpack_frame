'use strict'
const utils = require('./utils')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
   mode: 'development',
   plugins: [
      ...utils.getEntries().map(v => {
         return new ExtractTextPlugin(utils.resolve(`/src/${v}.css`));
      })
   ]
}