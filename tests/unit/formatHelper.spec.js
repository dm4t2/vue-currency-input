import { isNumeric, parse, removePrefix, removeSuffix } from '../../src/utils/formatHelper'

describe('formatHelper', () => {
  describe('isNumeric', () => {
    it('checks if a string is numeric', () => {
      expect(isNumeric(null)).toBe(false)
      expect(isNumeric(undefined)).toBe(false)
      expect(isNumeric('')).toBe(false)
      expect(isNumeric('.1')).toBe(true)
      expect(isNumeric('0.01')).toBe(true)
      expect(isNumeric('0')).toBe(true)
      expect(isNumeric('-1234')).toBe(true)
      expect(isNumeric('1234')).toBe(true)
      expect(isNumeric('1234,5')).toBe(false)
      expect(isNumeric('1234.5')).toBe(true)
    })
  })

  describe('removePrefix', () => {
    it('removes a prefix', () => {
      expect(removePrefix('abc', 'a')).toBe('bc')
      expect(removePrefix('abc', 'abc')).toBe('')
      expect(removePrefix('abc', '')).toBe('abc')
      expect(removePrefix('abc', 'd')).toBe('abc')
      expect(removePrefix('abc', null)).toBe('abc')
      expect(removePrefix('abc', undefined)).toBe('abc')
    })
  })

  describe('removeSuffix', () => {
    it('removes a suffix', () => {
      expect(removeSuffix('abc', 'c')).toBe('ab')
      expect(removeSuffix('abc', 'abc')).toBe('')
      expect(removeSuffix('abc', '')).toBe('abc')
      expect(removeSuffix('abc', 'd')).toBe('abc')
      expect(removeSuffix('abc', null)).toBe('abc')
      expect(removeSuffix('abc', undefined)).toBe('abc')
    })
  })

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
