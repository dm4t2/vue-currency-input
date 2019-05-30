import directive from './currencyDirective'
import component from './CurrencyInput.vue'
import defaultOptions from './defaultOptions'
import currencyFormatConfig from './utils/currencyFormatConfig'
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
    Vue.prototype.$parseCurrency = (str, locale = options.locale, currency = options.currency) => parse(str, currencyFormatConfig(locale, currency))
  }
}

export default plugin
export { component as CurrencyInput }
export { directive as CurrencyDirective }
