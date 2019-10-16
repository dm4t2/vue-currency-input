import Vue from 'vue'
import VueCurrencyInput from 'vue-currency-input'

Vue.use(VueCurrencyInput, <%= serialize(options) %>)
