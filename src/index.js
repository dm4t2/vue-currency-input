import directive from './currencyDirective'
import component from './CurrencyInput'
import defaultOptions from './defaultOptions'

const plugin = {
  install (Vue, {
    componentName = component.name,
    directiveName = 'currency',
    globalOptions = {}
  } = {}) {
    Vue.prototype.$CI_DEFAULT_OPTIONS = { ...defaultOptions, ...globalOptions }
    Vue.component(componentName, component)
    Vue.directive(directiveName, directive)
  }
}

export default plugin
export { component as CurrencyInput }
export { directive as CurrencyDirective }

// Auto install when included directly in the browser
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
