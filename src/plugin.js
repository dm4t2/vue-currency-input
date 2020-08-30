import { getValue, parse, setValue } from './api'
import component from './component'
import directive from './directive'

export default {
  install (Vue, {
    componentName = component.name,
    directiveName = 'currency',
    globalOptions = {}
  } = {}) {
    Vue.component(componentName, component)
    Vue.directive(directiveName, directive)
    Vue.prototype.$ci = {
      parse: (formattedValue, options) => parse(formattedValue, { ...globalOptions, ...options }),
      getValue,
      setValue,
      globalOptions
    }
  }
}
