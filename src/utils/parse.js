import { escapeRegExp, isNegative, normalizeDigits, onlyDigits, stripCurrencySymbol, stripMinusSymbol } from './stringUtils'

export default (str, currencyFormat) => {
  if (typeof str === 'string') {
    const negative = isNegative(str, currencyFormat)
    str = normalizeDigits(str, currencyFormat.digits)
    str = stripCurrencySymbol(str, currencyFormat)
    str = stripMinusSymbol(str, currencyFormat.minusSymbol)

    const grouping = `${escapeRegExp(currencyFormat.groupingSymbol)}?`
    const fraction = currencyFormat.decimalSymbol ? `(${escapeRegExp(currencyFormat.decimalSymbol)}\\d*)?` : ''
    const match = str.match(new RegExp(`^(0|[1-9]\\d{0,2}(${grouping}\\d{3})*)${fraction}$`))
    if (match) {
      return Number(`${negative ? '-' : ''}${(onlyDigits(match[1]))}.${(onlyDigits(match[3] || ''))}`)
    }
  }
  return null
}
