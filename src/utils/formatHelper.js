import createNumberMask from 'text-mask-addons/src/createNumberMask'

export const onlyDigits = (str) => str.replace(/\D+/g, '')

export const format = (el, value = el.value, { options, currencyFormatConfig, textMaskInputElement, focus } = el.$ci) => {
  if (typeof value === 'number') {
    value = new Intl.NumberFormat(options.locale, { minimumFractionDigits: focus && options.distractionFree ? 0 : currencyFormatConfig.decimalLimit }).format(value)
  }
  textMaskInputElement.update(value, {
    inputElement: el,
    guide: false,
    mask: createNumberMask({
      ...currencyFormatConfig,
      prefix: focus && options.distractionFree ? '' : currencyFormatConfig.prefix,
      suffix: focus && options.distractionFree ? '' : currencyFormatConfig.suffix,
      thousandsSeparatorSymbol: focus && options.distractionFree ? '' : currencyFormatConfig.thousandsSeparatorSymbol
    })
  })
  el.$ci.numberValue = parse(el.value, currencyFormatConfig)
}

export const parse = (str, { decimalSymbol, allowNegative = true } = {}) => {
  if (typeof str === 'number') {
    return str
  }
  if (str && typeof str === 'string' && str.trim().length) {
    const negative = str.startsWith('-') && allowNegative
    const numberParts = str.split(decimalSymbol)
    let number = onlyDigits(numberParts[0])
    if (negative) {
      number = '-' + number
    }
    if (numberParts.length === 2) {
      number += '.' + onlyDigits(numberParts[1])
    }
    if (number) {
      number = Number(number)
      return Number.isNaN(number) ? null : number
    }
  }
  return null
}

export const getCurrencyFormatConfig = ({ locale, currency, allowNegative = true } = {}) => {
  const numberFormat = new Intl.NumberFormat(locale, currency ? { style: 'currency', currency } : { minimumFractionDigits: 2 })
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
    allowNegative,
    decimalLimit,
    allowDecimal
  }
}

export const getCaretPosition = (el, { prefix, thousandsSeparatorSymbol }) => {
  return Math.max(0,
    el.selectionStart -
    prefix.length -
    (el.value.substring(0, el.selectionStart).match(new RegExp(thousandsSeparatorSymbol === '.' ? '\\.' : thousandsSeparatorSymbol, 'g')) || []).length
  )
}
