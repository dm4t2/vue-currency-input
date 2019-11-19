const createCurrencyFormat = (numberFormat) => {
  const ps = numberFormat.format(123456)
  const ns = numberFormat.format(-1)
  const decimalLength = (ps.match(/0/g) || []).length
  const decimalSymbol = decimalLength > 0 ? ps.substr(ps.indexOf('6') + 1, 1) : null
  const prefix = ps.substring(0, ps.indexOf('1'))
  const negativePrefix = ns.substring(0, ns.indexOf('1'))
  const suffix = ps.substring(ps.lastIndexOf(decimalLength > 0 ? '0' : '6') + 1)
  const groupingSymbol = ps.substr(ps.indexOf('3') + 1, 1)

  return {
    prefix,
    negativePrefix,
    suffix,
    groupingSymbol,
    decimalSymbol,
    decimalLength
  }
}

export default ({ locale, currency, decimalLength }) => {
  let minimumFractionDigits = 2
  if (decimalLength !== undefined) {
    minimumFractionDigits = decimalLength
  }
  if (currency == null) {
    return createCurrencyFormat(new Intl.NumberFormat(locale, { minimumFractionDigits }))
  } else if (typeof currency === 'object') {
    return {
      ...createCurrencyFormat(new Intl.NumberFormat(locale, { minimumFractionDigits })),
      prefix: currency.prefix || '',
      negativePrefix: `-${currency.prefix || ''}`,
      suffix: currency.suffix || ''
    }
  } else {
    const currencyFormat = createCurrencyFormat(new Intl.NumberFormat(locale, { style: 'currency', currency }))
    if (currencyFormat.decimalLength > 0 && decimalLength !== undefined) {
      currencyFormat.decimalLength = decimalLength
    }
    return currencyFormat
  }
}
