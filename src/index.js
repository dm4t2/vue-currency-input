import { getValue, parse, setValue } from './api'
import component from './component'
import directive from './directive'
import plugin from './plugin'

export default plugin
export {
  parse,
  getValue,
  setValue,
  component as CurrencyInput,
  directive as CurrencyDirective
}

// Auto install when included directly in the browser
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
