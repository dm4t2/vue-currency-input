export const toInteger = (number, valueAsInteger, fractionDigits) => {
  return valueAsInteger && number != null ? Number(number.toFixed(fractionDigits).split('.').join('')) : number
}

export const toFloat = (number, valueAsInteger, fractionDigits) => {
  return valueAsInteger && number != null ? number / Math.pow(10, fractionDigits) : number
}
