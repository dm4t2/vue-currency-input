export const toInteger = (number, valueAsInteger, fractionDigits) => {
  return valueAsInteger ? Number(number.toFixed(fractionDigits).split('.').join('')) : number
}

export const toFloat = (number, valueAsInteger, fractionDigits) => {
  return valueAsInteger ? number / Math.pow(10, fractionDigits) : number
}
