import 'core-js/stable'
import 'regenerator-runtime/runtime'
import VueCurrencyInput from '../../src/plugin'
import Vuetify from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'

export default ({ Vue, options }) => {
  Vue.use(Vuetify)
  options.vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#3eaf7c'
        },
      },
    }
  })
  Vue.use(VueCurrencyInput)
}
