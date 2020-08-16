import { DEFAULT_OPTIONS, getValue, setValue } from './api'
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
      getValue,
      setValue,
      GLOBAL_OPTIONS: { ...DEFAULT_OPTIONS, ...globalOptions }
    }
  }
}
