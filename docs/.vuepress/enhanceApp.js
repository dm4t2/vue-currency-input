import VueCurrencyInput from '../../src/plugin'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

export default ({ Vue, options }) => {
  Vue.use(Vuetify)
  options.vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#3f51b5',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c',
        },
      },
    }
  })
  Vue.use(VueCurrencyInput)
}
