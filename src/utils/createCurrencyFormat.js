const formatToParts = (number, numberFormat) => {
  const parts = numberFormat.formatToParts(number)
  const types = parts.map(p => p.type)

  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => i.toLocaleString(numberFormat.resolvedOptions().locale))
  const prefix = parts.slice(0, types.indexOf('integer')).map(p => p.value).join('')
  const suffix = parts.slice(Math.max(types.lastIndexOf('integer'), types.indexOf('fraction')) + 1).map(p => p.value).join('')
  const groupingSymbol = types.indexOf('group') !== -1 ? parts[types.indexOf('group')].value : undefined
  const decimalSymbol = types.indexOf('decimal') !== -1 ? parts[types.indexOf('decimal')].value : undefined
  const minusSymbol = types.indexOf('minusSign') !== -1 ? parts[types.indexOf('minusSign')].value : undefined

  return {
    digits,
    prefix,
    suffix,
    groupingSymbol,
    decimalSymbol,
    minusSymbol
  }
}

export default ({ locale, currency, precision, autoDecimalMode, valueAsInteger }) => {
  let options = typeof currency === 'string' ? { currency, style: 'currency' } : { minimumFractionDigits: 1 }
  const numberFormat = new Intl.NumberFormat(locale, options)
  const { minusSymbol, prefix: negativePrefix } = formatToParts(-1, numberFormat)
  const currencyFormat = {
    ...formatToParts(123456, numberFormat),
    minusSymbol,
    negativePrefix
  }

  let minimumFractionDigits = 2
  let maximumFractionDigits = 2
  if (currencyFormat.decimalSymbol === undefined) {
    minimumFractionDigits = maximumFractionDigits = 0
  } else if (typeof precision === 'number') {
    minimumFractionDigits = maximumFractionDigits = precision
  } else if (typeof precision === 'object' && !autoDecimalMode && !valueAsInteger) {
    minimumFractionDigits = precision.min || 0
    maximumFractionDigits = precision.max !== undefined ? precision.max : 20
  } else if (typeof currency === 'string') {
    minimumFractionDigits = numberFormat.resolvedOptions().minimumFractionDigits
    maximumFractionDigits = numberFormat.resolvedOptions().maximumFractionDigits
  }

  if (currency != null && typeof currency === 'object') {
    currencyFormat.prefix = currency.prefix || ''
    currencyFormat.negativePrefix = `${currencyFormat.minusSymbol}${currency.prefix || ''}`
    currencyFormat.suffix = currency.suffix || ''
  }

  return { ...currencyFormat, minimumFractionDigits, maximumFractionDigits }
}
