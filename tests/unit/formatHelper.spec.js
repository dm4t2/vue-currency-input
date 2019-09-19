import { removePrefix, removeSuffix } from '../../src/utils/formatHelper'

describe('formatHelper', () => {
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
})
