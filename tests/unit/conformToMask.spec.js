import conformToMask from '../../src/utils/conformToMask'

describe('conformToMask', () => {
  describe('when the value is null or undefined', () => {
    it('returns the previous conformed value', () => {
      const currencyFormat = { decimalSymbol: '.', prefix: '$', suffix: '', maximumFractionDigits: 2 }

      expect(conformToMask(undefined, currencyFormat, '$1')).toEqual({ conformedValue: '$1' })
      expect(conformToMask(null, currencyFormat, '$1')).toEqual({ conformedValue: '$1' })
    })
  })

  describe('when the value is invalid', () => {
    it('returns an empty value', () => {
      const currencyFormat = { decimalSymbol: '.', prefix: '$', suffix: '', maximumFractionDigits: 2 }

      expect(conformToMask('', currencyFormat, '$1')).toEqual({ conformedValue: '' })
      expect(conformToMask(' ', currencyFormat, '$1')).toEqual({ conformedValue: '' })
      expect(conformToMask('foo', currencyFormat, '$1')).toEqual({ conformedValue: '' })
      expect(conformToMask('$', currencyFormat, '$1')).toEqual({ conformedValue: '' })
      expect(conformToMask('$a', currencyFormat, '$1')).toEqual({ conformedValue: '' })
    })
  })

  describe('when the fraction is invalid', () => {
    it('returns the previous conformed value', () => {
      const currencyFormat = { decimalSymbol: '.', prefix: '$', suffix: '', maximumFractionDigits: 2 }

      expect(conformToMask('1..', currencyFormat, '$1')).toEqual({ conformedValue: '$1' })
      expect(conformToMask('1.a', currencyFormat, '$1')).toEqual({ conformedValue: '$1' })
    })
  })

  describe('when a invalid negative value is about to being entered', () => {
    describe('the currency symbol is hidden', () => {
      it('returns the previous conformed value', () => {
        const currencyFormat = { decimalSymbol: '.', prefix: '$ ', negativePrefix: '-$ ', suffix: '', maximumFractionDigits: 2 }
        expect(conformToMask('-a', currencyFormat, '-', true)).toEqual({ conformedValue: '-' })
        expect(conformToMask('--', currencyFormat, '-', true)).toEqual({ conformedValue: '-' })
      })
    })

    describe('the currency symbol is prefixed', () => {
      it('returns the previous conformed value', () => {
        const currencyFormat = { decimalSymbol: '.', prefix: '$ ', negativePrefix: '-$ ', suffix: '', maximumFractionDigits: 2 }
        expect(conformToMask('-$ a', currencyFormat, '-$ ')).toEqual({ conformedValue: '-$ ' })
        expect(conformToMask('-$ -', currencyFormat, '-$ ')).toEqual({ conformedValue: '-$ ' })
      })
    })

    describe('the currency symbol is suffixed', () => {
      it('returns the previous conformed value', () => {
        const currencyFormat = { decimalSymbol: '.', prefix: '', negativePrefix: '-', suffix: ' $', maximumFractionDigits: 2 }
        expect(conformToMask('-a $', currencyFormat, '- $')).toEqual({ conformedValue: '- $' })
        expect(conformToMask('-- $', currencyFormat, '- $')).toEqual({ conformedValue: '- $' })
      })
    })
  })

  describe('when the value is negative and the prefixed currency symbol is deleted', () => {
    it('returns an empty value', () => {
      expect(conformToMask('-', {
        decimalSymbol: '.',
        prefix: '$',
        negativePrefix: '-$',
        suffix: '',
        maximumFractionDigits: 2
      }, '-$')).toEqual({ conformedValue: '' })
    })
  })

  describe('when the value is incomplete', () => {
    describe('the currency symbol is hidden', () => {
      it('returns the expected value', () => {
        const currencyFormat = {
          decimalSymbol: '.',
          groupingSymbol: ',',
          prefix: '$',
          negativePrefix: '-$',
          suffix: '',
          maximumFractionDigits: 2
        }

        expect(conformToMask('-', currencyFormat, '', true)).toEqual({ conformedValue: '-' })
        expect(conformToMask('1.', currencyFormat, '', true)).toEqual({ conformedValue: '1.' })
        expect(conformToMask('1234.', currencyFormat, '', true)).toEqual({ conformedValue: '1234.' })
        expect(conformToMask('1,234.', currencyFormat, '', true)).toEqual({ conformedValue: '1,234.' })
        expect(conformToMask('-1.', currencyFormat, '', true)).toEqual({ conformedValue: '-1.' })
        expect(conformToMask('-1234.', currencyFormat, '', true)).toEqual({ conformedValue: '-1234.' })
        expect(conformToMask('-1,234.', currencyFormat, '', true)).toEqual({ conformedValue: '-1,234.' })
        expect(conformToMask('.', currencyFormat, '', true)).toEqual({ conformedValue: '0.' })
        expect(conformToMask('.1', currencyFormat, '', true)).toEqual({ conformedValue: '0.1' })
        expect(conformToMask('.1.234', currencyFormat, '', true)).toEqual({ conformedValue: '0.12' })
        expect(conformToMask('-.', currencyFormat, '', true)).toEqual({ conformedValue: '-0.' })
        expect(conformToMask('-.1', currencyFormat, '', true)).toEqual({ conformedValue: '-0.1' })
        expect(conformToMask('-.1.234', currencyFormat, '', true)).toEqual({ conformedValue: '-0.12' })
      })
    })

    describe('the currency symbol is prefixed', () => {
      it('returns the expected value', () => {
        const currencyFormat = {
          decimalSymbol: '.',
          groupingSymbol: ',',
          prefix: '$ ',
          negativePrefix: '-$ ',
          suffix: '',
          maximumFractionDigits: 2
        }

        expect(conformToMask('-', currencyFormat)).toEqual({ conformedValue: '-$ ' })
        expect(conformToMask('-$ ', currencyFormat, '-$ 5')).toEqual({ conformedValue: '-$ ' })
        expect(conformToMask('-', currencyFormat, '-$ ')).toEqual({ conformedValue: '' })
        expect(conformToMask('1.', currencyFormat)).toEqual({ conformedValue: '$ 1.' })
        expect(conformToMask('1234.', currencyFormat)).toEqual({ conformedValue: '$ 1234.' })
        expect(conformToMask('1,234.', currencyFormat)).toEqual({ conformedValue: '$ 1,234.' })
        expect(conformToMask('-1.', currencyFormat)).toEqual({ conformedValue: '-$ 1.' })
        expect(conformToMask('-1234.', currencyFormat)).toEqual({ conformedValue: '-$ 1234.' })
        expect(conformToMask('-1,234.', currencyFormat)).toEqual({ conformedValue: '-$ 1,234.' })
        expect(conformToMask('.', currencyFormat)).toEqual({ conformedValue: '$ 0.' })
        expect(conformToMask('.1', currencyFormat)).toEqual({ conformedValue: '$ 0.1' })
        expect(conformToMask('.1.234', currencyFormat)).toEqual({ conformedValue: '$ 0.12' })
        expect(conformToMask('-.', currencyFormat)).toEqual({ conformedValue: '-$ 0.' })
        expect(conformToMask('-.1', currencyFormat)).toEqual({ conformedValue: '-$ 0.1' })
        expect(conformToMask('-.1.234', currencyFormat)).toEqual({ conformedValue: '-$ 0.12' })
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
          maximumFractionDigits: 2
        }

        expect(conformToMask('-', currencyFormat)).toEqual({ conformedValue: '- $' })
        expect(conformToMask('1.', currencyFormat)).toEqual({ conformedValue: '1. $' })
        expect(conformToMask('1234.', currencyFormat)).toEqual({ conformedValue: '1234. $' })
        expect(conformToMask('1,234.', currencyFormat)).toEqual({ conformedValue: '1,234. $' })
        expect(conformToMask('-1.', currencyFormat)).toEqual({ conformedValue: '-1. $' })
        expect(conformToMask('-1234.', currencyFormat)).toEqual({ conformedValue: '-1234. $' })
        expect(conformToMask('-1,234.', currencyFormat)).toEqual({ conformedValue: '-1,234. $' })
        expect(conformToMask('.', currencyFormat)).toEqual({ conformedValue: '0. $' })
        expect(conformToMask('.1', currencyFormat)).toEqual({ conformedValue: '0.1 $' })
        expect(conformToMask('.1.234', currencyFormat)).toEqual({ conformedValue: '0.12 $' })
        expect(conformToMask('-.', currencyFormat)).toEqual({ conformedValue: '-0. $' })
        expect(conformToMask('-.1', currencyFormat)).toEqual({ conformedValue: '-0.1 $' })
        expect(conformToMask('-.1.234', currencyFormat)).toEqual({ conformedValue: '-0.12 $' })
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
          maximumFractionDigits: 0
        }

        expect(conformToMask('-', currencyFormat)).toEqual({ conformedValue: '-' })
        expect(conformToMask('1.', currencyFormat)).toEqual({ conformedValue: 1, fractionDigits: '' })
        expect(conformToMask('1234.', currencyFormat)).toEqual({ conformedValue: 1234, fractionDigits: '' })
        expect(conformToMask('1,234.', currencyFormat)).toEqual({ conformedValue: 1234, fractionDigits: '' })
        expect(conformToMask('-1.', currencyFormat)).toEqual({ conformedValue: -1, fractionDigits: '' })
        expect(conformToMask('-1234.', currencyFormat)).toEqual({ conformedValue: -1234, fractionDigits: '' })
        expect(conformToMask('-1,234.', currencyFormat)).toEqual({ conformedValue: -1234, fractionDigits: '' })
        expect(conformToMask('.', currencyFormat)).toEqual({ conformedValue: '' })
        expect(conformToMask('.1', currencyFormat)).toEqual({ conformedValue: 1, fractionDigits: '' })
        expect(conformToMask('.1.234', currencyFormat)).toEqual({ conformedValue: 1234, fractionDigits: '' })
        expect(conformToMask('-.', currencyFormat)).toEqual({ conformedValue: '' })
        expect(conformToMask('-.1', currencyFormat)).toEqual({ conformedValue: -1, fractionDigits: '' })
        expect(conformToMask('-.1.234', currencyFormat)).toEqual({ conformedValue: -1234, fractionDigits: '' })
      })
    })
  })

  describe('when the value conforms to the mask', () => {
    it('returns the expected result', () => {
      const currencyFormat = { decimalSymbol: ',', prefix: '$', suffix: '', maximumFractionDigits: 4 }

      expect(conformToMask('1', currencyFormat)).toEqual({ conformedValue: 1, fractionDigits: '' })
      expect(conformToMask('1,2', currencyFormat)).toEqual({ conformedValue: 1.2, fractionDigits: '2' })
      expect(conformToMask('1,232323', currencyFormat)).toEqual({ conformedValue: 1.2323, fractionDigits: '2323' })
      expect(conformToMask('0', currencyFormat)).toEqual({ conformedValue: 0, fractionDigits: '' })
      expect(conformToMask('-0', currencyFormat)).toEqual({ conformedValue: -0, fractionDigits: '' })
      expect(conformToMask('-0,5', currencyFormat)).toEqual({ conformedValue: -0.5, fractionDigits: '5' })
      expect(conformToMask('1.000', currencyFormat)).toEqual({ conformedValue: 1000, fractionDigits: '' })
    })
  })

  describe('when auto decimal mode is enabled', () => {
    it('returns the expected result', () => {
      const currencyFormat = { minimumFractionDigits: 2 }

      expect(conformToMask('', currencyFormat, '', false, true)).toEqual({ conformedValue: '' })
      expect(conformToMask('-', currencyFormat, '', false, true)).toEqual({ conformedValue: -0, fractionDigits: '00' })
      expect(conformToMask('1', currencyFormat, '', false, true)).toEqual({ conformedValue: 0.01, fractionDigits: '01' })
      expect(conformToMask('12345', currencyFormat, '', false, true)).toEqual({ conformedValue: 123.45, fractionDigits: '45' })
      expect(conformToMask('-12345', currencyFormat, '', false, true)).toEqual({ conformedValue: -123.45, fractionDigits: '45' })
      expect(conformToMask('00012345', currencyFormat, '', false, true)).toEqual({ conformedValue: 123.45, fractionDigits: '45' })
    })
  })

  describe('when the currency prefix contains the decimal symbol', () => {
    it('returns the expected result', () => {
      const currencyFormat = { decimalSymbol: '.', prefix: 'Fr. ', suffix: '', maximumFractionDigits: 4 }

      expect(conformToMask('Fr. 1.2', currencyFormat)).toEqual({ conformedValue: 1.2, fractionDigits: '2' })
      expect(conformToMask('-Fr. 0.5', currencyFormat)).toEqual({ conformedValue: -0.5, fractionDigits: '5' })
    })
  })
})
