import conformToMask from '../../src/utils/conformToMask'

describe('conformToMask', () => {
  describe('when the value is null or undefined', () => {
    it('returns the previous conformed value', () => {
      const currencyFormat = { decimalSymbol: '.', prefix: '$', suffix: '' }
      expect(conformToMask(undefined, currencyFormat, false, '$1')).toEqual({ conformedValue: '$1' })
      expect(conformToMask(null, currencyFormat, false, '$1')).toEqual({ conformedValue: '$1' })
    })
  })

  describe('when the value is invalid', () => {
    it('returns an empty value', () => {
      const currencyFormat = { decimalSymbol: '.', prefix: '$', suffix: '' }

      expect(conformToMask('', currencyFormat, false, '$1')).toEqual({ conformedValue: '' })
      expect(conformToMask(' ', currencyFormat, false, '$1')).toEqual({ conformedValue: '' })
      expect(conformToMask('foo', currencyFormat, false, '$1')).toEqual({ conformedValue: '' })
      expect(conformToMask('$', currencyFormat, false, '$1')).toEqual({ conformedValue: '' })
      expect(conformToMask('$a', currencyFormat, false, '$1')).toEqual({ conformedValue: '' })
    })
  })

  describe('when the fraction is invalid', () => {
    it('returns the previous conformed value', () => {
      const currencyFormat = { decimalSymbol: '.', prefix: '$', suffix: '' }

      expect(conformToMask('1.', currencyFormat, false, '$1')).toEqual({ conformedValue: '$1' })
      expect(conformToMask('1..', currencyFormat, false, '$1')).toEqual({ conformedValue: '$1' })
      expect(conformToMask('1.a', currencyFormat, false, '$1')).toEqual({ conformedValue: '$1' })
    })
  })

  describe('when a invalid negative value is about to being entered', () => {
    it('returns the previous conformed value', () => {
      expect(conformToMask('-$a', { decimalSymbol: '.', prefix: '$', suffix: '' }, false, '$1')).toEqual({ conformedValue: '$1' })
      expect(conformToMask('-a $', { decimalSymbol: '.', prefix: '', suffix: ' $' }, false, '$1')).toEqual({ conformedValue: '$1' })
    })
  })

  describe('when the value is negative and the prefixed currency symbol is deleted', () => {
    it('returns an empty value', () => {
      expect(conformToMask('-', { decimalSymbol: '.', prefix: '$', negativePrefix: '-$', suffix: '' }, false, '-$')).toEqual({ conformedValue: '' })
    })
  })

  describe('when the value is incomplete', () => {
    describe('the currency symbol is hidden', () => {
      it('returns the expected value', () => {
        const currencyFormat = {
          decimalSymbol: '.',
          groupingSymbol: ',',
          prefix: '',
          negativePrefix: '-',
          suffix: '',
          decimalLength: 2
        }

        expect(conformToMask('-', currencyFormat, false)).toEqual({ conformedValue: '-' })
        expect(conformToMask('1.', currencyFormat, false)).toEqual({ conformedValue: '1.' })
        expect(conformToMask('1234.', currencyFormat, false)).toEqual({ conformedValue: '1234.' })
        expect(conformToMask('1,234.', currencyFormat, false)).toEqual({ conformedValue: '1,234.' })
        expect(conformToMask('-1.', currencyFormat, false)).toEqual({ conformedValue: '-1.' })
        expect(conformToMask('-1234.', currencyFormat, false)).toEqual({ conformedValue: '-1234.' })
        expect(conformToMask('-1,234.', currencyFormat, false)).toEqual({ conformedValue: '-1,234.' })
        expect(conformToMask('.', currencyFormat, false)).toEqual({ conformedValue: '0.' })
        expect(conformToMask('.1', currencyFormat, false)).toEqual({ conformedValue: '0.1' })
        expect(conformToMask('.1.234', currencyFormat, false)).toEqual({ conformedValue: '0.12' })
        expect(conformToMask('-.', currencyFormat, false)).toEqual({ conformedValue: '-0.' })
        expect(conformToMask('-.1', currencyFormat, false)).toEqual({ conformedValue: '-0.1' })
        expect(conformToMask('-.1.234', currencyFormat, false)).toEqual({ conformedValue: '-0.12' })
      })
    })

    describe('the currency symbol is prefixed', () => {
      it('returns the expected value', () => {
        const currencyFormat = {
          decimalSymbol: '.',
          groupingSymbol: ',',
          prefix: '$',
          negativePrefix: '-$',
          suffix: '',
          decimalLength: 2
        }

        expect(conformToMask('-', currencyFormat, false)).toEqual({ conformedValue: '-$' })
        expect(conformToMask('-', currencyFormat, false, '-$')).toEqual({ conformedValue: '' })
        expect(conformToMask('1.', currencyFormat, false)).toEqual({ conformedValue: '$1.' })
        expect(conformToMask('1234.', currencyFormat, false)).toEqual({ conformedValue: '$1234.' })
        expect(conformToMask('1,234.', currencyFormat, false)).toEqual({ conformedValue: '$1,234.' })
        expect(conformToMask('-1.', currencyFormat, false)).toEqual({ conformedValue: '-$1.' })
        expect(conformToMask('-1234.', currencyFormat, false)).toEqual({ conformedValue: '-$1234.' })
        expect(conformToMask('-1,234.', currencyFormat, false)).toEqual({ conformedValue: '-$1,234.' })
        expect(conformToMask('.', currencyFormat, false)).toEqual({ conformedValue: '$0.' })
        expect(conformToMask('.1', currencyFormat, false)).toEqual({ conformedValue: '$0.1' })
        expect(conformToMask('.1.234', currencyFormat, false)).toEqual({ conformedValue: '$0.12' })
        expect(conformToMask('-.', currencyFormat, false)).toEqual({ conformedValue: '-$0.' })
        expect(conformToMask('-.1', currencyFormat, false)).toEqual({ conformedValue: '-$0.1' })
        expect(conformToMask('-.1.234', currencyFormat, false)).toEqual({ conformedValue: '-$0.12' })
      })
    })

    describe('the currency symbol is suffixed', () => {
      it('returns the expected value', () => {
        const currencyFormat = {
          decimalSymbol: '.',
          groupingSymbol: ',',
          prefix: '',
          negativePrefix: '-',
          suffix: ' $',
          decimalLength: 2
        }

        expect(conformToMask('-', currencyFormat, false)).toEqual({ conformedValue: '- $' })
        expect(conformToMask('1.', currencyFormat, false)).toEqual({ conformedValue: '1. $' })
        expect(conformToMask('1234.', currencyFormat, false)).toEqual({ conformedValue: '1234. $' })
        expect(conformToMask('1,234.', currencyFormat, false)).toEqual({ conformedValue: '1,234. $' })
        expect(conformToMask('-1.', currencyFormat, false)).toEqual({ conformedValue: '-1. $' })
        expect(conformToMask('-1234.', currencyFormat, false)).toEqual({ conformedValue: '-1234. $' })
        expect(conformToMask('-1,234.', currencyFormat, false)).toEqual({ conformedValue: '-1,234. $' })
        expect(conformToMask('.', currencyFormat, false)).toEqual({ conformedValue: '0. $' })
        expect(conformToMask('.1', currencyFormat, false)).toEqual({ conformedValue: '0.1 $' })
        expect(conformToMask('.1.234', currencyFormat, false)).toEqual({ conformedValue: '0.12 $' })
        expect(conformToMask('-.', currencyFormat, false)).toEqual({ conformedValue: '-0. $' })
        expect(conformToMask('-.1', currencyFormat, false)).toEqual({ conformedValue: '-0.1 $' })
        expect(conformToMask('-.1.234', currencyFormat, false)).toEqual({ conformedValue: '-0.12 $' })
      })
    })

    describe('no decimal digits are allowed', () => {
      it('returns the expected value', () => {
        const currencyFormat = {
          decimalSymbol: null,
          groupingSymbol: ',',
          prefix: '',
          negativePrefix: '-',
          suffix: '',
          decimalLength: 0
        }

        expect(conformToMask('-', currencyFormat, false)).toEqual({ conformedValue: '-' })
        expect(conformToMask('1.', currencyFormat, false)).toEqual({ conformedValue: 1, fractionDigits: '' })
        expect(conformToMask('1234.', currencyFormat, false)).toEqual({ conformedValue: 1234, fractionDigits: '' })
        expect(conformToMask('1,234.', currencyFormat, false)).toEqual({ conformedValue: 1234, fractionDigits: '' })
        expect(conformToMask('-1.', currencyFormat, false)).toEqual({ conformedValue: -1, fractionDigits: '' })
        expect(conformToMask('-1234.', currencyFormat, false)).toEqual({ conformedValue: -1234, fractionDigits: '' })
        expect(conformToMask('-1,234.', currencyFormat, false)).toEqual({ conformedValue: -1234, fractionDigits: '' })
        expect(conformToMask('.', currencyFormat, false)).toEqual({ conformedValue: '' })
        expect(conformToMask('.1', currencyFormat, false)).toEqual({ conformedValue: 1, fractionDigits: '' })
        expect(conformToMask('.1.234', currencyFormat, false)).toEqual({ conformedValue: 1234, fractionDigits: '' })
        expect(conformToMask('-.', currencyFormat, false)).toEqual({ conformedValue: '' })
        expect(conformToMask('-.1', currencyFormat, false)).toEqual({ conformedValue: -1, fractionDigits: '' })
        expect(conformToMask('-.1.234', currencyFormat, false)).toEqual({ conformedValue: -1234, fractionDigits: '' })
      })
    })
  })

  describe('when the value conforms to the mask', () => {
    it('returns the expected result', () => {
      const currencyFormat = { decimalSymbol: ',', prefix: '$', suffix: '', decimalLength: 4 }

      expect(conformToMask('1', currencyFormat, false)).toEqual({ conformedValue: 1, fractionDigits: '' })
      expect(conformToMask('1,2', currencyFormat, false)).toEqual({ conformedValue: 1.2, fractionDigits: '2' })
      expect(conformToMask('1.2', currencyFormat, false)).toEqual({ conformedValue: 1.2, fractionDigits: '2' })
      expect(conformToMask('1,232323', currencyFormat, false)).toEqual({ conformedValue: 1.2323, fractionDigits: '2323' })
      expect(conformToMask('1.232323', currencyFormat, false)).toEqual({ conformedValue: 1.2323, fractionDigits: '2323' })
      expect(conformToMask('0', currencyFormat, false)).toEqual({ conformedValue: 0, fractionDigits: '' })
      expect(conformToMask('-0', currencyFormat, false)).toEqual({ conformedValue: -0, fractionDigits: '' })
      expect(conformToMask('0.5', currencyFormat, false)).toEqual({ conformedValue: 0.5, fractionDigits: '5' })
      expect(conformToMask('-0,5', currencyFormat, false)).toEqual({ conformedValue: -0.5, fractionDigits: '5' })
    })
  })

  describe('when auto decimal mode is enabled', () => {
    it('returns the expected result', () => {
      const currencyFormat = { decimalSymbol: ',', prefix: '$', suffix: '', decimalLength: 2 }

      expect(conformToMask('', currencyFormat, true)).toEqual({ conformedValue: '' })
      expect(conformToMask('-', currencyFormat, true)).toEqual({ conformedValue: -0, fractionDigits: '00' })
      expect(conformToMask('1', currencyFormat, true)).toEqual({ conformedValue: 0.01, fractionDigits: '01' })
      expect(conformToMask('12345', currencyFormat, true)).toEqual({ conformedValue: 123.45, fractionDigits: '45' })
      expect(conformToMask('-12345', currencyFormat, true)).toEqual({ conformedValue: -123.45, fractionDigits: '45' })
      expect(conformToMask('00012345', currencyFormat, true)).toEqual({ conformedValue: 123.45, fractionDigits: '45' })
    })
  })
})
