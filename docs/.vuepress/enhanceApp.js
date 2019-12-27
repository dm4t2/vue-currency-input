import VueCurrencyInput from '../../src/plugin'
import Vuetify from 'vuetify'

export default ({ Vue, router, options }) => {
  Vue.use(Vuetify)
  options.vuetify = new Vuetify()
  Vue.use(VueCurrencyInput)

  router.addRoutes([
    { path: '/examples/', redirect: '/playground/' }
  ])
}
