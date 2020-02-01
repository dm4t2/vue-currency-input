const createCurrencyFormat = (numberFormat) => {
  const ps = numberFormat.format(123456)
  const ns = numberFormat.format(-1)
  const hasFractionDigits = (ps.match(/0/g) || []).length > 0
  const decimalSymbol = hasFractionDigits ? ps.substr(ps.indexOf('6') + 1, 1) : null
  const prefix = ps.substring(0, ps.indexOf('1'))
  const negativePrefix = ns.substring(0, ns.indexOf('1'))
  const suffix = ps.substring(ps.lastIndexOf(hasFractionDigits ? '0' : '6') + 1)
  const groupingSymbol = ps.substr(ps.indexOf('3') + 1, 1)

  return {
    prefix,
    negativePrefix,
    suffix,
    groupingSymbol,
    decimalSymbol
  }
}

export default ({ locale, currency, precision, autoDecimalMode, valueAsInteger }) => {
  let currencyFormat
  let minimumFractionDigits = 2
  let maximumFractionDigits = 2
  if (typeof precision === 'number') {
    minimumFractionDigits = maximumFractionDigits = precision
  } else if (typeof precision === 'object' && !autoDecimalMode && !valueAsInteger) {
    minimumFractionDigits = precision.min || 0
    maximumFractionDigits = precision.max !== undefined ? precision.max : 20
  }
  const minusSymbol = new Intl.NumberFormat(locale).format(-1).charAt(0)
  if (currency == null) {
    currencyFormat = createCurrencyFormat(new Intl.NumberFormat(locale, { minimumFractionDigits: 1 }))
  } else if (typeof currency === 'object') {
    currencyFormat = {
      ...createCurrencyFormat(new Intl.NumberFormat(locale, { minimumFractionDigits: 1 })),
      prefix: currency.prefix || '',
      negativePrefix: `${minusSymbol}${currency.prefix || ''}`,
      suffix: currency.suffix || ''
    }
  } else {
    const numberFormat = new Intl.NumberFormat(locale, { currency, style: 'currency' })
    currencyFormat = createCurrencyFormat(numberFormat)
    if (currencyFormat.decimalSymbol == null) {
      minimumFractionDigits = maximumFractionDigits = 0
    } else if (precision === undefined) {
      minimumFractionDigits = numberFormat.resolvedOptions().minimumFractionDigits
      maximumFractionDigits = numberFormat.resolvedOptions().maximumFractionDigits
    }
  }
  return {
    ...currencyFormat,
    minimumFractionDigits,
    maximumFractionDigits,
    minusSymbol
  }
}
