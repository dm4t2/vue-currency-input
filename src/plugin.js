import { parseCurrency } from './api'
import component from './component'
import defaultOptions from './defaultOptions'
import directive from './directive'

export default {
  install (Vue, {
    componentName = component.name,
    directiveName = 'currency',
    globalOptions = {}
  } = {}) {
    const options = { ...defaultOptions, ...globalOptions }
    Vue.prototype.$CI_DEFAULT_OPTIONS = options
    Vue.component(componentName, component)
    Vue.directive(directiveName, directive)
    Vue.prototype.$parseCurrency = (str, locale = options.locale, currency = options.currency) => parseCurrency(str, locale, currency)
  }
}
