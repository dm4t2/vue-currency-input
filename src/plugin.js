import { DEFAULT_OPTIONS, parseCurrency, setValue } from './api'
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
    Vue.prototype.$currencyInput = {
      parseCurrency: (str, options = {}) => {
        return parseCurrency(str, { ...globalOptions, ...options })
      },
      setValue: (el, value) => {
        return setValue(el, value)
      }
    }
  }
}
