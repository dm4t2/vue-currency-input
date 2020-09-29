import Vuetify from 'vuetify'

export default ({ Vue, options }) => {
  Vue.use(Vuetify)
  options.vuetify = new Vuetify()
}
