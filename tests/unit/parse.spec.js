import parse from '../../src/utils/parse'
import createCurrencyFormat from '../../src/utils/createCurrencyFormat'

describe('parse', () => {
  it('returns null if the value is empty', () => {
    expect(parse('', { digits: [] })).toBeNull()
    expect(parse(' ', { digits: [] })).toBeNull()
    expect(parse(null, { digits: [] })).toBeNull()
    expect(parse(undefined, { digits: [] })).toBeNull()
  })

  it('returns null if the value is invalid', () => {
    expect(parse('-', { digits: [] })).toBeNull()
    expect(parse('123e-1', { digits: [] })).toBeNull()
    expect(parse('0x11', { digits: [] })).toBeNull()
    expect(parse('0b11', { digits: [] })).toBeNull()
    expect(parse('0o11', { digits: [] })).toBeNull()
    expect(parse('1.2e1', { digits: [], decimalSymbol: '.' })).toBeNull()
    expect(parse('1.23.4', { digits: [], decimalSymbol: '.' })).toBeNull()
  })

  it('returns the parsed number if the value conforms to the currency format config', () => {
    expect(parse('1234', { digits: [], decimalSymbol: '.' })).toBe(1234)
    expect(parse('1234', { digits: [], minimumFractionDigits: 3 }, true)).toBe(1234000)
    expect(parse('1,234,567', { digits: [], groupingSymbol: ',' })).toBe(1234567)
    expect(parse('1.234.567', { digits: [], groupingSymbol: '.' })).toBe(1234567)
    expect(parse('$1,234,567', { digits: [], prefix: '$', groupingSymbol: ',' })).toBe(1234567)
    expect(parse('1234 €', { digits: [], suffix: ' €' })).toBe(1234)
    expect(parse('-1234', { digits: [], decimalSymbol: '.' })).toBe(-1234)
    expect(parse('-$1234', { digits: [], prefix: '$' })).toBe(-1234)
    expect(parse('-1234 €', { digits: [], suffix: ' €' })).toBe(-1234)
    expect(parse('123.456', { digits: [], groupingSymbol: '.' })).toBe(123456)
    expect(parse('.5', { digits: [], decimalSymbol: '.' })).toBe(null)
    expect(parse('0.5', { digits: [], decimalSymbol: '.' })).toBe(0.5)
    expect(parse('1234.50', { digits: [], decimalSymbol: '.' })).toBe(1234.5)
    expect(parse('$1234.50', { digits: [], decimalSymbol: '.', prefix: '$' })).toBe(1234.5)
    expect(parse('1234.50 €', { digits: [], decimalSymbol: '.', suffix: ' €' })).toBe(1234.5)
    expect(parse('1234.5', { digits: [], decimalSymbol: '.' })).toBe(1234.5)
    expect(parse('1234.00', { digits: [], decimalSymbol: '.' })).toBe(1234)
    expect(parse('1234.0', { digits: [], decimalSymbol: '.' })).toBe(1234)
    expect(parse('1234.50 €', { digits: [], decimalSymbol: '.', suffix: ' €', minimumFractionDigits: 2 }, true)).toBe(123450)
  })

  it('returns null if the value does not conform to the currency format config', () => {
    expect(parse('1234,5', { digits: [], decimalSymbol: '.' })).toBeNull()
    expect(parse('$1234', { digits: [], suffix: ' €' })).toBeNull()
    expect(parse('1234 €', { digits: [], prefix: '$' })).toBeNull()
    expect(parse('1,234,567', { digits: [], groupingSymbol: '.' })).toBeNull()
  })

  it('should parse arabic numbers', () => {
    expect(parse('١٢٣٤', createCurrencyFormat({ locale: 'ar', currency: 'SAR' }))).toBe(1234)
    expect(parse('١٬٢٣٤', createCurrencyFormat({ locale: 'ar', currency: 'SAR' }))).toBe(1234)
    expect(parse('٠٫٩', createCurrencyFormat({ locale: 'ar', currency: 'SAR' }))).toBe(0.9)
  })
})
