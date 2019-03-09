import { parse } from '../../src/utils/formatHelper'

describe('formatHelper', () => {
  describe('parse', () => {
    it('parses empty values', () => {
      expect(parse('')).toBeNull()
      expect(parse(' ')).toBeNull()
      expect(parse(null)).toBeNull()
      expect(parse(undefined)).toBeNull()
    })

    it('parses invalid values', () => {
      expect(parse('-')).toBeNull()
      expect(parse('abc')).toBeNull()
      expect(parse('a b c')).toBeNull()
    })

    it('returns a passed number directly', () => {
      expect(parse(1234)).toBe(1234)
    })

    it('parses positive values', () => {
      expect(parse('1234')).toBe(1234)
      expect(parse('$1234')).toBe(1234)
      expect(parse('1234 €')).toBe(1234)
    })

    it('parses negative values', () => {
      expect(parse('-1234')).toBe(-1234)
      expect(parse('-$1234')).toBe(-1234)
      expect(parse('-1234 €')).toBe(-1234)
      expect(parse('-$1234', { allowNegative: false })).toBe(1234)
      expect(parse('-1234 €', { allowNegative: false })).toBe(1234)
    })

    it('parses values with fraction', () => {
      expect(parse('1234.50', { decimalSymbol: '.' })).toBe(1234.5)
      expect(parse('$1234.50', { decimalSymbol: '.' })).toBe(1234.5)
      expect(parse('1234.50 €', { decimalSymbol: '.' })).toBe(1234.5)
      expect(parse('1234.5', { decimalSymbol: '.' })).toBe(1234.5)
      expect(parse('1234.00', { decimalSymbol: '.' })).toBe(1234)
      expect(parse('1234.0', { decimalSymbol: '.' })).toBe(1234)
    })

    it('ignores decimal symbols if not configured', () => {
      expect(parse('1234.5')).toBe(12345)
      expect(parse('1234,5')).toBe(12345)
    })
  })
})
