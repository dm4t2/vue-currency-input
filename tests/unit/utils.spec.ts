import { describe, expect, it } from 'vitest'
import { bigIntToDecimalString, decimalStringToBigInt } from '../../src/utils'

describe('stringToBigInt', () => {
  it('should convert valid decimal strings to BigInt with correct decimal places', () => {
    expect(decimalStringToBigInt('123', 2)).toBe(12300n)
    expect(decimalStringToBigInt('456.78', 3)).toBe(456780n)
  })

  it('should handle negative numbers correctly', () => {
    expect(decimalStringToBigInt('-123.45', 2)).toBe(-12345n)
  })

  it('should pad zeros for values with fewer decimals than specified', () => {
    expect(decimalStringToBigInt('1.2', 4)).toBe(12000n)
  })

  it('should truncate decimals that exceed the required precision', () => {
    expect(decimalStringToBigInt('1.2345678', 3)).toBe(1234n)
  })

  it('should interpret numbers without decimals as integers', () => {
    expect(decimalStringToBigInt('123', 5)).toBe(12300000n)
    expect(decimalStringToBigInt('-99', 2)).toBe(-9900n)
  })

  it('should handle special cases with 0 values', () => {
    expect(decimalStringToBigInt('0', 3)).toBe(0n)
    expect(decimalStringToBigInt('0.000', 3)).toBe(0n)
  })

  it('should return null for empty or null inputs', () => {
    expect(decimalStringToBigInt('', 2)).toBe(null)
    expect(decimalStringToBigInt(null, 2)).toBe(null)
  })

  it('should return null for invalid strings', () => {
    expect(decimalStringToBigInt('invalid', 2)).toBe(null)
    expect(decimalStringToBigInt('12.34.56', 2)).toBe(null)
    expect(decimalStringToBigInt('12a34', 2)).toBe(null)
    expect(decimalStringToBigInt('123.', 3)).toBe(null)
  })

  it('should treat inputs without decimals as integers when decimalPlaces is zero', () => {
    expect(decimalStringToBigInt('78', 0)).toBe(78n)
  })
})

describe('bigIntToDecimalString', () => {
  it('should convert a BigInt to a fixed precision decimal string', () => {
    expect(bigIntToDecimalString(12345n, 2)).toBe('123.45')
    expect(bigIntToDecimalString(-12345n, 3)).toBe('-12.345')
    expect(bigIntToDecimalString(0n, 4)).toBe('0.0000')
  })

  it('should handle null values', () => {
    expect(bigIntToDecimalString(null, 2)).toBe(null)
  })

  it('should throw an error for negative decimal places', () => {
    expect(() => bigIntToDecimalString(12345n, -1)).toThrow('Decimal places must be non-negative')
  })

  it('should handle zero decimal places', () => {
    expect(bigIntToDecimalString(12345n, 0)).toBe('12345')
    expect(bigIntToDecimalString(-12345n, 0)).toBe('-12345')
  })

  it('should correctly pad with zeros for small values', () => {
    expect(bigIntToDecimalString(1n, 5)).toBe('0.00001')
    expect(bigIntToDecimalString(-1n, 3)).toBe('-0.001')
  })
})
