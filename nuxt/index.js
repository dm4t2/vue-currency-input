import { resolve } from 'path'

module.exports = function nuxtVueCurrencyInput(moduleOptions) {
  this.addPlugin({
    src: resolve(__dirname, 'index.js'),
    fileName: 'vue-currency-input.js',
    options: moduleOptions
  })
}

module.exports.meta = require('../package.json')
