export const onlyDigits = (str) => str.replace(/\D+/g, '')

export const removePrefix = (str, prefix) => {
  if (prefix && str.startsWith(prefix)) {
    return str.substr(prefix.length)
  }
  return str
}

export const removeSuffix = (str, suffix) => {
  if (suffix && str.endsWith(suffix)) {
    return str.slice(0, suffix.length * -1)
  }
  return str
}

export const parse = (str, { decimalSymbol, allowNegative = true } = {}) => {
  if (str && str.trim().length > 0) {
    const negative = str.startsWith('-') && allowNegative
    const numberParts = str.split(decimalSymbol)
    let number = onlyDigits(numberParts[0])
    if (negative) {
      number = '-' + number
    }
    if (numberParts.length === 2) {
      number += '.' + onlyDigits(numberParts[1])
    }
    number = Number(number)
    return Number.isNaN(number) ? null : number
  }
  return null
}
