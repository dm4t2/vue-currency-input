const { resolve } = require('path')

module.exports = function nuxtVueCurrencyInput(options) {
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'vue-currency-input.js',
    options
  })
}

module.exports.meta = require('../package.json')
