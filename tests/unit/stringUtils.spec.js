import { isNegative } from '../../src/utils/stringUtils'

describe('isNegative', () => {
  it('should return true if the string starts with a minus sign (U+2212)', () => {
    expect(isNegative('−1')).toBe(true)
  })

  it('should return true if the string starts with a hyphen-minus (U+002D)', () => {
    expect(isNegative('-1')).toBe(true)
  })

  it('should return true if the string starts with a hyphen (U+2010)', () => {
    expect(isNegative('‐1')).toBe(true)
  })

  it('should return false if the string starts with another char', () => {
    expect(isNegative('1')).toBe(false)
    expect(isNegative('a')).toBe(false)
    expect(isNegative('')).toBe(false)
  })
})
