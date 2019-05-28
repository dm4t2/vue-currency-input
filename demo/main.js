import Vue from 'vue'
import VueCurrencyInput from '../src/plugin'
import App from './App.vue'

Vue.use(VueCurrencyInput)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
