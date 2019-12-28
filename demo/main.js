import Vue from 'vue'
import VueCurrencyInput from '../src/plugin'
import App from './App.vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.use(VueCurrencyInput)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  vuetify: new Vuetify()
}).$mount('#app')
