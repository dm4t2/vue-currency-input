import parse from '../../src/utils/parse'

describe('parse', () => {
  it('returns null if the value is empty', () => {
    expect(parse('', {})).toBeNull()
    expect(parse(' ', {})).toBeNull()
    expect(parse(null, {})).toBeNull()
    expect(parse(undefined, {})).toBeNull()
  })

  it('returns null if the value is invalid', () => {
    expect(parse('-', {})).toBeNull()
    expect(parse('123e-1', {})).toBeNull()
    expect(parse('0x11', {})).toBeNull()
    expect(parse('0b11', {})).toBeNull()
    expect(parse('0o11', {})).toBeNull()
    expect(parse('1.2e1', { decimalSymbol: '.' })).toBeNull()
    expect(parse('1.23.4', { decimalSymbol: '.' })).toBeNull()
  })

  it('returns the parsed number if the value conforms to the currency format config', () => {
    expect(parse('1234')).toBe(1234)
    expect(parse('1234', { decimalLength: 3 }, true)).toBe(1.234)
    expect(parse('1,234,567', { groupingSymbol: ',' })).toBe(1234567)
    expect(parse('$1,234,567', { prefix: '$', groupingSymbol: ',' })).toBe(1234567)
    expect(parse('1234 €', { suffix: ' €' })).toBe(1234)
    expect(parse('-1234')).toBe(-1234)
    expect(parse('-$1234', { prefix: '$' })).toBe(-1234)
    expect(parse('-1234 €', { suffix: ' €' })).toBe(-1234)
    expect(parse('1234.5', { decimalSymbol: null, groupingSymbol: '.' })).toBe(1234.5)
    expect(parse('.5', { decimalSymbol: '.' })).toBe(0.5)
    expect(parse('0.5', { decimalSymbol: '.' })).toBe(0.5)
    expect(parse('1234.50', { decimalSymbol: '.' })).toBe(1234.5)
    expect(parse('$1234.50', { decimalSymbol: '.', prefix: '$' })).toBe(1234.5)
    expect(parse('1234.50 €', { decimalSymbol: '.', suffix: ' €' })).toBe(1234.5)
    expect(parse('1234.5', { decimalSymbol: '.' })).toBe(1234.5)
    expect(parse('1234.00', { decimalSymbol: '.' })).toBe(1234)
    expect(parse('1234.0', { decimalSymbol: '.' })).toBe(1234)
    expect(parse('1234.50 €', { decimalSymbol: '.', suffix: ' €', decimalLength: 2 }, true)).toBe(12.345)
  })

  it('returns null if the value does not conform to the currency format config', () => {
    expect(parse('1234,5', { decimalSymbol: '.' })).toBeNull()
    expect(parse('$1234', { suffix: ' €' })).toBeNull()
    expect(parse('1234 €', { prefix: '$' })).toBeNull()
    expect(parse('1,234,567', { groupingSymbol: '.' })).toBeNull()
  })
})
