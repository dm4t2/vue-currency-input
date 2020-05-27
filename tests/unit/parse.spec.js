import parse from '../../src/utils/parse'
import createCurrencyFormat from '../../src/utils/createCurrencyFormat'

const currencyFormat = createCurrencyFormat({ locale: 'en', currency: 'USD' })

describe('parse', () => {
  it('returns null if the value is empty', () => {
    expect(parse('', currencyFormat)).toBeNull()
    expect(parse(' ', currencyFormat)).toBeNull()
    expect(parse(null, currencyFormat)).toBeNull()
    expect(parse(undefined, currencyFormat)).toBeNull()
  })

  it('returns null if the value is invalid', () => {
    expect(parse('-', currencyFormat)).toBeNull()
    expect(parse('123e-1', currencyFormat)).toBeNull()
    expect(parse('0x11', currencyFormat)).toBeNull()
    expect(parse('0b11', currencyFormat)).toBeNull()
    expect(parse('0o11', currencyFormat)).toBeNull()
    expect(parse('1.2e1', currencyFormat)).toBeNull()
    expect(parse('1.23.4', currencyFormat)).toBeNull()
  })

  it('returns the parsed number if the value conforms to the currency format config', () => {
    expect(parse('1234', currencyFormat)).toBe(1234)
    expect(parse('1,234,567', currencyFormat)).toBe(1234567)
    expect(parse('1.234.567', createCurrencyFormat({ locale: 'de', currency: 'EUR' }))).toBe(1234567)
    expect(parse('$1,234,567', currencyFormat)).toBe(1234567)
    expect(parse('1234 €', createCurrencyFormat({ locale: 'de', currency: 'EUR' }))).toBe(1234)
    expect(parse('-1234', currencyFormat)).toBe(-1234)
    expect(parse('-$1234', currencyFormat)).toBe(-1234)
    expect(parse('-1234 €', createCurrencyFormat({ locale: 'de', currency: 'EUR' }))).toBe(-1234)
    expect(parse('123.456', createCurrencyFormat({ locale: 'de', currency: 'EUR' }))).toBe(123456)
    expect(parse('0.5', currencyFormat)).toBe(0.5)
    expect(parse('1234.50', currencyFormat)).toBe(1234.5)
    expect(parse('$1234.50', currencyFormat)).toBe(1234.5)
    expect(parse('1234,50 €', createCurrencyFormat({ locale: 'de', currency: 'EUR' }))).toBe(1234.5)
    expect(parse('1234.5', currencyFormat)).toBe(1234.5)
    expect(parse('1234.00', currencyFormat)).toBe(1234)
    expect(parse('1234.0', currencyFormat)).toBe(1234)
  })

  it('returns null if the value does not conform to the currency format config', () => {
    expect(parse('1234,5', currencyFormat)).toBeNull()
    expect(parse('$1234', createCurrencyFormat({ locale: 'de', currency: 'EUR' }))).toBeNull()
    expect(parse('1234 €', currencyFormat)).toBeNull()
    expect(parse('1,234,567', createCurrencyFormat({ locale: 'de', currency: 'EUR' }))).toBeNull()
  })

  it('should parse arabic numbers', () => {
    expect(parse('١٢٣٤', createCurrencyFormat({ locale: 'ar', currency: 'SAR' }))).toBe(1234)
    expect(parse('١٬٢٣٤', createCurrencyFormat({ locale: 'ar', currency: 'SAR' }))).toBe(1234)
    expect(parse('٠٫٩', createCurrencyFormat({ locale: 'ar', currency: 'SAR' }))).toBe(0.9)
    expect(parse('؜-٠٫٥٠ ر.س.‏', createCurrencyFormat({ locale: 'ar', currency: 'SAR' }))).toBe(-0.5)
  })
})
