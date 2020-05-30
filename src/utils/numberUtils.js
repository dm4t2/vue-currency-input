export const toExternalNumberModel = (number, valueAsInteger, fractionDigits) => {
  return valueAsInteger && number != null ? Number(number.toFixed(fractionDigits).split('.').join('')) : number
}

export const toInternalNumberModel = (number, valueAsInteger, fractionDigits) => {
  return valueAsInteger && number != null ? number / Math.pow(10, fractionDigits) : number
}
