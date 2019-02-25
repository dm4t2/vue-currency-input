import component from './CurrencyInput'
import directive from './curencyDirective'

const plugin = {
  install (Vue, { componentName, directiveName }) {
    Vue.component(componentName || component.name, component)
    Vue.directive(directiveName || 'currency', directive)
  }
}

export default plugin
export { component as CurrencyInput }
export { directive as CurrencyDirective }

// Auto install when included directly in the browser
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
