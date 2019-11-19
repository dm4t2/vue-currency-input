import { parseCurrency } from './api'
import component from './component'
import DEFAULT_OPTIONS from './defaultOptions'
import directive from './directive'

export default {
  install (Vue, {
    componentName = component.name,
    directiveName = 'currency',
    globalOptions = {}
  } = {}) {
    const defaultOptions = { ...DEFAULT_OPTIONS, ...globalOptions }
    Vue.prototype.$CI_DEFAULT_OPTIONS = defaultOptions
    Vue.component(componentName, component)
    Vue.directive(directiveName, directive)
    Vue.prototype.$parseCurrency = (str, options = defaultOptions) => parseCurrency(str, options)
  }
}
