export default ({ locale, currency, min }) => {
  const str = new Intl.NumberFormat(locale, { style: 'currency', currency }).format(1234)
  const decimalLimit = (str.match(/0/g) || []).length
  const decimalSymbol = decimalLimit > 0 ? str.substr(str.indexOf('4') + 1, 1) : null
  const allowDecimal = decimalLimit !== 0
  const prefix = str.substring(0, str.indexOf('1'))
  const suffix = str.substring(str.lastIndexOf(decimalLimit > 0 ? '0' : '4') + 1)
  const thousandsSeparatorSymbol = str.substr(str.indexOf('1') + 1, 1)
  const allowNegative = min == null || min < 0

  return {
    prefix,
    suffix,
    thousandsSeparatorSymbol,
    decimalSymbol,
    decimalLimit,
    allowDecimal,
    allowNegative,
    locale
  }
}
