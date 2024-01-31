import { describe, expect, it } from 'vitest'
import { bigIntToString, stringToBigInt } from '../../src/utils'

describe('stringToBigInt', () => {
  it('should convert a decimal string to a BigInt', () => {
    expect(stringToBigInt('123', 2)).toBe(12300n)
    expect(stringToBigInt('-123', 2)).toBe(-12300n)
    expect(stringToBigInt('123.45', 2)).toBe(12345n)
    expect(stringToBigInt('0', 2)).toBe(0n)
    expect(stringToBigInt('1', 2)).toBe(100n)
    expect(stringToBigInt('0.1', 2)).toBe(10n)
    expect(stringToBigInt('0.01', 2)).toBe(1n)
    expect(stringToBigInt('.1', 2)).toBe(10n)
    expect(stringToBigInt('-.1', 2)).toBe(-10n)
  })

  it('should return null for empty values', () => {
    expect(stringToBigInt('', 2)).toBe(null)
    expect(stringToBigInt(null, 2)).toBe(null)
  })
})

describe('bigIntToString', () => {
  it('should convert a BigInt to a decimal string', () => {
    expect(bigIntToString(12300n, 2)).toBe('123.00')
    expect(bigIntToString(-12300n, 2)).toBe('-123.00')
    expect(bigIntToString(12345n, 2)).toBe('123.45')
    expect(bigIntToString(0n, 2)).toBe('0.00')
    expect(bigIntToString(100n, 2)).toBe('1.00')
    expect(bigIntToString(10n, 2)).toBe('0.10')
    expect(bigIntToString(1n, 2)).toBe('0.01')
  })

  it('should return null for null values', () => {
    expect(bigIntToString(null, 2)).toBe(null)
  })
})
