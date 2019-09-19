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
