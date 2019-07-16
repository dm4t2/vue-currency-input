import component from './component'
import defaultOptions from './defaultOptions'
import directive from './directive'
import createCurrencyFormat from './utils/createCurrencyFormat'
import { parse } from './utils/formatHelper'

const plugin = {
  install (Vue, {
    componentName = component.name,
    directiveName = 'currency',
    globalOptions = {}
  } = {}) {
    const options = { ...defaultOptions, ...globalOptions }
    Vue.prototype.$CI_DEFAULT_OPTIONS = options
    Vue.component(componentName, component)
    Vue.directive(directiveName, directive)
    Vue.prototype.$parseCurrency = (str, locale = options.locale, currency = options.currency) => {
      return parse(str, createCurrencyFormat({ ...options, locale, currency }))
    }
  }
}

export default plugin
export { component as CurrencyInput }
export { directive as CurrencyDirective }
