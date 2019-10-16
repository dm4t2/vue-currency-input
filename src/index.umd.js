import { parseCurrency } from './api'
import component from './component'
import directive from './directive'
import plugin from './plugin'

export default plugin
export {
  parseCurrency,
  component as CurrencyInput,
  directive as CurrencyDirective
}

// Auto install when included directly in the browser
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
