export default ({ locale, currency }) => {
  const str = new Intl.NumberFormat(locale, { style: 'currency', currency }).format(123456)
  const decimalLength = (str.match(/0/g) || []).length
  const decimalSymbol = decimalLength > 0 ? str.substr(str.indexOf('6') + 1, 1) : null
  const prefix = str.substring(0, str.indexOf('1'))
  const suffix = str.substring(str.lastIndexOf(decimalLength > 0 ? '0' : '6') + 1)
  const groupingSymbol = str.substr(str.indexOf('3') + 1, 1)

  return {
    prefix,
    suffix,
    groupingSymbol,
    decimalSymbol,
    decimalLength
  }
}
