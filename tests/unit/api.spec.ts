import { parse } from '../../src'

describe('parse', () => {
  it('should parse a formatted value', () => {
    expect(parse('€1,234', { locale: 'en', currency: 'EUR' })).toBe(1234)
  })
})
