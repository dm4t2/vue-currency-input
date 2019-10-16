import Vue from 'vue'
import VueCurrencyInput from 'vue-currency-input'

const pluginOptions = {
  /* see config reference */
  globalOptions: { currency: 'USD', ... }
}
Vue.use(VueCurrencyInput, pluginOptions)
