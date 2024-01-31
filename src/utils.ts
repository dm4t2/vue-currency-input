export const escapeRegExp = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export const removeLeadingZeros = (str: string): string => {
  return str.replace(/^0+(0$|[^0])/, '$1')
}

export const count = (str: string, search: string): number => {
  return (str.match(new RegExp(escapeRegExp(search), 'g')) || []).length
}

export const substringBefore = (str: string, search: string): string => {
  return str.substring(0, str.indexOf(search))
}

export const stringToBigInt = (value: string | null, maximumFractionDigits: number): bigint | null => {
  const [integer, fraction] = (value ?? '').split('.')
  if (integer || fraction) {
    const digits = `${integer}${(fraction || '').padEnd(maximumFractionDigits, '0')}`
    return BigInt(digits)
  }
  return null
}

export const bigIntToString = (value: bigint | null, maximumFractionDigits: number): string | null => {
  if (value != null) {
    const digits = `${value.toString().padStart(maximumFractionDigits, '0')}`
    return `${digits.slice(0, digits.length - maximumFractionDigits) || '0'}.${digits.slice(-maximumFractionDigits)}`
  }
  return null
}
