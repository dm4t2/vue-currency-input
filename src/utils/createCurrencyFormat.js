const createCurrencyFormat = (numberFormat) => {
  const ps = numberFormat.format(123456)
  const ns = numberFormat.format(-1)
  const minimumFractionDigits = numberFormat.resolvedOptions().minimumFractionDigits || 0
  const maximumFractionDigits = numberFormat.resolvedOptions().maximumFractionDigits || 0
  const decimalSymbol = minimumFractionDigits > 0 ? ps.substr(ps.indexOf('6') + 1, 1) : null
  const prefix = ps.substring(0, ps.indexOf('1'))
  const negativePrefix = ns.substring(0, ns.indexOf('1'))
  const suffix = ps.substring(ps.lastIndexOf(minimumFractionDigits > 0 ? '0' : '6') + 1)
  const groupingSymbol = ps.substr(ps.indexOf('3') + 1, 1)

  return {
    prefix,
    negativePrefix,
    suffix,
    groupingSymbol,
    decimalSymbol,
    minimumFractionDigits,
    maximumFractionDigits
  }
}

export default ({ locale, currency, precision, autoDecimalMode, valueAsInteger }) => {
  let minimumFractionDigits = 2
  let maximumFractionDigits = 2
  if (typeof precision === 'number') {
    minimumFractionDigits = maximumFractionDigits = precision
  } else if (typeof precision === 'object' && !autoDecimalMode && !valueAsInteger) {
    minimumFractionDigits = precision.min || 0
    maximumFractionDigits = precision.max !== undefined ? precision.max : 20
  }
  if (currency == null) {
    return createCurrencyFormat(new Intl.NumberFormat(locale, { minimumFractionDigits, maximumFractionDigits }))
  } else if (typeof currency === 'object') {
    return {
      ...createCurrencyFormat(new Intl.NumberFormat(locale, { minimumFractionDigits, maximumFractionDigits })),
      prefix: currency.prefix || '',
      negativePrefix: `-${currency.prefix || ''}`,
      suffix: currency.suffix || ''
    }
  } else {
    const currencyFormat = createCurrencyFormat(new Intl.NumberFormat(locale, { currency, style: 'currency' }))
    if (precision !== undefined) {
      if (currencyFormat.minimumFractionDigits > 0) {
        currencyFormat.minimumFractionDigits = minimumFractionDigits
      }
      if (currencyFormat.maximumFractionDigits > 0) {
        currencyFormat.maximumFractionDigits = maximumFractionDigits
      }
    }
    return currencyFormat
  }
}
