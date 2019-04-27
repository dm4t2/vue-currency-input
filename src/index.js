import component from './CurrencyInput'
import directive from './currencyDirective'

const plugin = {
  install (Vue, { componentName = component.name, directiveName = 'currency' } = {}) {
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
