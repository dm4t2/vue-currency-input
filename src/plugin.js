import { DEFAULT_OPTIONS, parseCurrency } from './api'
import component from './component'
import directive from './directive'

export default {
  install (Vue, {
    componentName = component.name,
    directiveName = 'currency',
    globalOptions = {}
  } = {}) {
    Vue.prototype.$CI_DEFAULT_OPTIONS = { ...DEFAULT_OPTIONS, ...globalOptions }
    Vue.component(componentName, component)
    Vue.directive(directiveName, directive)
    Vue.prototype.$parseCurrency = (str, options = {}) => parseCurrency(str, { ...globalOptions, ...options })
  }
}
