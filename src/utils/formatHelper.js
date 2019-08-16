export const onlyDigits = (str) => str.replace(/\D+/g, '')

export const count = (str, search) => (str.match(new RegExp(`\\${search}`, 'g')) || []).length

export const endsWith = (str, search) => {
  return str.substring(str.length - search.length, str.length) === search
}

export const startsWith = (str, search) => {
  return str.substring(0, search.length) === search
}

export const removePrefix = (str, prefix) => {
  if (prefix && startsWith(str, prefix)) {
    return str.substr(prefix.length)
  }
  return str
}

export const removeSuffix = (str, suffix) => {
  if (suffix && endsWith(str, suffix)) {
    return str.slice(0, suffix.length * -1)
  }
  return str
}

export const removeCurrencySymbol = (str, { prefix, suffix }) => {
  return removePrefix(removeSuffix(str, suffix), prefix)
}

export const parse = (str, { prefix, suffix, thousandsSeparatorSymbol, decimalSymbol } = {}) => {
  if (typeof str === 'number') {
    return str
  } else if (str && typeof str === 'string') {
    if (str.match(/^-?\d+(\.\d+)?$/)) {
      return Number(str)
    }
    const negative = startsWith(str, '-')
    str = removePrefix(str, '-')
    str = removeCurrencySymbol(str, { prefix, suffix })
    const numberParts = str.split(decimalSymbol)
    if (numberParts.length > 2) {
      return null
    }
    let integer = numberParts[0].replace(new RegExp(thousandsSeparatorSymbol === '.' ? '\\.' : thousandsSeparatorSymbol, 'g'), '')
    if (integer.length && !integer.match(/^\d+$/g)) {
      return null
    }
    let number = integer
    if (numberParts.length === 2) {
      const fraction = numberParts[1]
      if (fraction.length && !fraction.match(/^\d+$/g)) {
        return null
      }
      number += `.${fraction}`
    }
    if (number) {
      if (negative) {
        number = `-${number}`
      }
      return Number(number)
    }
  }
  return null
}
