export default (locale, currency) => {
  const numberFormat = new Intl.NumberFormat(locale, { style: 'currency', currency })
  const formattedNumber = numberFormat.format(1234)
  const decimalLimit = (formattedNumber.match(/0/g) || []).length
  const decimalSymbol = decimalLimit > 0 ? formattedNumber.substr(formattedNumber.indexOf('4') + 1, 1) : null
  const allowDecimal = decimalSymbol !== null
  const prefix = formattedNumber.substring(0, formattedNumber.indexOf('1'))
  const suffix = formattedNumber.substring(formattedNumber.lastIndexOf(decimalLimit > 0 ? '0' : '4') + 1)
  const thousandsSeparatorSymbol = formattedNumber.substr(formattedNumber.indexOf('1') + 1, 1)

  return {
    prefix,
    suffix,
    thousandsSeparatorSymbol,
    decimalSymbol,
    decimalLimit,
    allowDecimal
  }
}
