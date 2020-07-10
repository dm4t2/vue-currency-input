export const toExternalNumberModel = (number, valueAsInteger, fractionDigits) => {
  return valueAsInteger && number != null ? Number(number.toFixed(fractionDigits).split('.').join('')) : number
}
