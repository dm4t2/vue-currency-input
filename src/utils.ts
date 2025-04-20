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

/** Represents a string that may contain a decimal number */
export type DecimalString = string | null

/** Regular expression to match decimal numbers */
const DECIMAL_NUMBER_PATTERN = /^(-?\d+)(?:\.(\d+))?$/

/**
 * Converts a decimal string to a BigInt value with specified precision.
 *
 * @param value - The decimal string to convert (e.g., "123.45", "-678.90")
 * @param decimalPlaces - Number of decimal places to maintain (must be non-negative)
 * @returns BigInt representation of the number or null if invalid input
 * @throws {Error} If decimalPlaces is negative
 *
 * @example
 * decimalStringToBigInt("123.45", 2) // Returns 12345n
 * decimalStringToBigInt("-67.89", 3) // Returns -67890n
 */
export const decimalStringToBigInt = (value: DecimalString, decimalPlaces: number): bigint | null => {
  if (value === null) return null
  if (decimalPlaces < 0) {
    throw new Error('Decimal places must be non-negative')
  }

  const matchResult = value.match(DECIMAL_NUMBER_PATTERN)
  if (!matchResult) return null

  const [, integerPart, fractionalPart = ''] = matchResult
  const normalizedFraction = fractionalPart.substring(0, decimalPlaces).padEnd(decimalPlaces, '0')

  return BigInt(integerPart + normalizedFraction)
}

/**
 * Converts a BigInt value to a decimal string with specified precision.
 * @param value - The BigInt value to convert (can be null)
 * @param decimalPlaces - The number of decimal places in the output (must be non-negative)
 * @returns Formatted decimal string or null if input is null
 * @throws {Error} If decimalPlaces parameter is negative
 *
 * @example
 * bigIntToDecimalString(12345n, 2) // Returns "123.45"
 * bigIntToDecimalString(-67890n, 3) // Returns "-67.890"
 * bigIntToDecimalString(1000n, 0) // Returns "1000"
 * bigIntToDecimalString(null, 2) // Returns null
 */
export const bigIntToDecimalString = (value: bigint | null, decimalPlaces: number): string | null => {
  if (value === null) return null
  if (decimalPlaces < 0) throw new Error('Decimal places must be non-negative')
  if (decimalPlaces === 0) return value.toString()

  const isNegative = value < 0n
  const absValue = isNegative ? -value : value
  const str = absValue.toString().padStart(decimalPlaces + 1, '0')
  const integerPart = str.slice(0, -decimalPlaces) || '0'
  const decimalPart = str.slice(-decimalPlaces)
  return `${isNegative ? '-' : ''}${integerPart}.${decimalPart}`
}
