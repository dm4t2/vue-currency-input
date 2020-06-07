import conformToMask from '../../src/utils/conformToMask'
import NumberFormat from '../../src/numberFormat'

describe('conformToMask', () => {
  describe('when the value is invalid', () => {
    it('returns an empty value', () => {
      const numberFormat = new NumberFormat({ locale: 'en', currency: 'USD' })

      expect(conformToMask('', numberFormat, '$1')).toEqual('')
      expect(conformToMask(' ', numberFormat, '$1')).toEqual('')
      expect(conformToMask('foo', numberFormat, '$1')).toEqual('')
      expect(conformToMask('$', numberFormat, '$1')).toEqual('')
      expect(conformToMask('$a', numberFormat, '$1')).toEqual('')
    })
  })

  describe('when the fraction is invalid', () => {
    it('returns the previous conformed value', () => {
      const numberFormat = new NumberFormat({ locale: 'en', currency: 'USD' })

      expect(conformToMask('1..', numberFormat, '$1')).toEqual('$1')
      expect(conformToMask('1.a', numberFormat, '$1')).toEqual('$1')
    })
  })

  describe('when a invalid negative value is about to being entered', () => {
    describe('the currency symbol is hidden', () => {
      it('returns the previous conformed value', () => {
        const numberFormat = new NumberFormat({ locale: 'en', currency: null })

        expect(conformToMask('-a', numberFormat, '-', false, true)).toEqual('-')
        expect(conformToMask('--', numberFormat, '-', false, true)).toEqual('-')
      })
    })

    describe('the currency symbol is prefixed', () => {
      it('returns the previous conformed value', () => {
        const numberFormat = new NumberFormat({ locale: 'en', currency: 'USD' })

        expect(conformToMask('-$a', numberFormat, '-$', false, true)).toEqual('-$')
        expect(conformToMask('-$-', numberFormat, '-$', false, true)).toEqual('-$')
      })
    })

    describe('the currency symbol is suffixed', () => {
      it('returns the previous conformed value', () => {
        const numberFormat = new NumberFormat({ locale: 'de', currency: 'USD' })

        expect(conformToMask('-a $', numberFormat, '- $', false, true)).toEqual('- $')
        expect(conformToMask('-- $', numberFormat, '- $', false, true)).toEqual('- $')
      })
    })
  })

  describe('when the value is negative and the prefixed currency symbol is deleted', () => {
    it('returns an empty value', () => {
      expect(conformToMask('-', new NumberFormat({ locale: 'en', currency: 'USD' }), '-$')).toEqual('')
    })
  })

  describe('when the value is incomplete', () => {
    describe('the digits are locale dependent', () => {
      it('returns the expected value', () => {
        const numberFormat = new NumberFormat({ locale: 'ar-SA', currency: null })

        expect(conformToMask('٫١١', numberFormat, '')).toEqual('٠٫١١')
      })
    })

    describe('the currency symbol is hidden', () => {
      it('returns the expected value', () => {
        const numberFormat = new NumberFormat({ locale: 'en', currency: null })

        expect(conformToMask('-', numberFormat, '', false, true)).toEqual('-')
        expect(conformToMask('1.', numberFormat, '')).toEqual('1.')
        expect(conformToMask('1234.', numberFormat, '')).toEqual('1234.')
        expect(conformToMask('1,234.', numberFormat, '')).toEqual('1,234.')
        expect(conformToMask('-1.', numberFormat, '', false, true)).toEqual('-1.')
        expect(conformToMask('-1.', numberFormat, '', false, false)).toEqual('1.')
        expect(conformToMask('-1234.', numberFormat, '', false, true)).toEqual('-1234.')
        expect(conformToMask('-1,234.', numberFormat, '', false, true)).toEqual('-1,234.')
        expect(conformToMask('.', numberFormat, '')).toEqual('0.')
        expect(conformToMask('.1', numberFormat, '')).toEqual('0.1')
        expect(conformToMask('.1.234', numberFormat, '')).toEqual('0.12')
        expect(conformToMask('-.', numberFormat, '', false, true)).toEqual('-0.')
        expect(conformToMask('-.1', numberFormat, '', false, true)).toEqual('-0.1')
        expect(conformToMask('-.1.234', numberFormat, '', false, true)).toEqual('-0.12')
      })
    })

    describe('the currency symbol is prefixed', () => {
      it('returns the expected value', () => {
        const numberFormat = new NumberFormat({ locale: 'en', currency: 'USD' })

        expect(conformToMask('-', numberFormat, '', false, true)).toEqual('-$')
        expect(conformToMask('-$', numberFormat, '-$5', false, true)).toEqual('-$')
        expect(conformToMask('-', numberFormat, '-$')).toEqual('')
        expect(conformToMask('1.', numberFormat)).toEqual('$1.')
        expect(conformToMask('1234.', numberFormat)).toEqual('$1234.')
        expect(conformToMask('1,234.', numberFormat)).toEqual('$1,234.')
        expect(conformToMask('-1.', numberFormat, '', false, true)).toEqual('-$1.')
        expect(conformToMask('-1.', numberFormat, '', false, false)).toEqual('$1.')
        expect(conformToMask('-1234.', numberFormat, '', false, true)).toEqual('-$1234.')
        expect(conformToMask('-1,234.', numberFormat, '', false, true)).toEqual('-$1,234.')
        expect(conformToMask('.', numberFormat)).toEqual('$0.')
        expect(conformToMask('.1', numberFormat)).toEqual('$0.1')
        expect(conformToMask('.1.234', numberFormat)).toEqual('$0.12')
        expect(conformToMask('-.', numberFormat, '', false, true)).toEqual('-$0.')
        expect(conformToMask('-.1', numberFormat, '', false, true)).toEqual('-$0.1')
        expect(conformToMask('-.1.234', numberFormat, '', false, true)).toEqual('-$0.12')
      })
    })

    describe('the currency symbol is suffixed', () => {
      it('returns the expected value', () => {
        const numberFormat = new NumberFormat({ locale: 'de', currency: 'USD' })

        expect(conformToMask('-', numberFormat, '', false, true)).toEqual('- $')
        expect(conformToMask('1,', numberFormat)).toEqual('1, $')
        expect(conformToMask('1234,', numberFormat)).toEqual('1234, $')
        expect(conformToMask('1.234,', numberFormat)).toEqual('1.234, $')
        expect(conformToMask('-1,', numberFormat, '', false, true)).toEqual('-1, $')
        expect(conformToMask('-1,', numberFormat, '', false, false)).toEqual('1, $')
        expect(conformToMask('-1234,', numberFormat, '', false, true)).toEqual('-1234, $')
        expect(conformToMask('-1.234,', numberFormat, '', false, true)).toEqual('-1.234, $')
        expect(conformToMask(',', numberFormat)).toEqual('0, $')
        expect(conformToMask(',1', numberFormat)).toEqual('0,1 $')
        expect(conformToMask(',1,234', numberFormat)).toEqual('0,12 $')
        expect(conformToMask('-,', numberFormat, '', false, true)).toEqual('-0, $')
        expect(conformToMask('-,1', numberFormat, '', false, true)).toEqual('-0,1 $')
        expect(conformToMask('-,1,234', numberFormat, '', false, true)).toEqual('-0,12 $')
      })
    })

    describe('no decimal digits are allowed', () => {
      it('returns the expected value', () => {
        const numberFormat = new NumberFormat({ locale: 'ja', currency: 'JPY' })

        expect(conformToMask('1.', numberFormat)).toEqual({ numberValue: 1, fractionDigits: '' })
        expect(conformToMask('1234.', numberFormat)).toEqual({ numberValue: 1234, fractionDigits: '' })
        expect(conformToMask('1,234.', numberFormat)).toEqual({ numberValue: 1234, fractionDigits: '' })
        expect(conformToMask('-1.', numberFormat, '', false, true)).toEqual({ numberValue: -1, fractionDigits: '' })
        expect(conformToMask('-1234.', numberFormat, '', false, true)).toEqual({ numberValue: -1234, fractionDigits: '' })
        expect(conformToMask('-1,234.', numberFormat, '', false, true)).toEqual({ numberValue: -1234, fractionDigits: '' })
        expect(conformToMask('.', numberFormat)).toEqual('')
        expect(conformToMask('.1', numberFormat)).toEqual({ numberValue: 1, fractionDigits: '' })
        expect(conformToMask('.1.234', numberFormat)).toEqual({ numberValue: 1234, fractionDigits: '' })
        expect(conformToMask('-.', numberFormat)).toEqual('')
        expect(conformToMask('-.1', numberFormat, '', false, true)).toEqual({ numberValue: -1, fractionDigits: '' })
        expect(conformToMask('-.1.234', numberFormat, '', false, true)).toEqual({ numberValue: -1234, fractionDigits: '' })
      })
    })
  })

  describe('when the value conforms to the mask', () => {
    it('returns the expected result', () => {
      const numberFormat = new NumberFormat({ locale: 'de', currency: 'USD', precision: 4 })

      expect(conformToMask('1', numberFormat)).toEqual({ numberValue: 1, fractionDigits: '' })
      expect(conformToMask('-1', numberFormat, '', false, false)).toEqual({ numberValue: 1, fractionDigits: '' })
      expect(conformToMask('1,2', numberFormat)).toEqual({ numberValue: 1.2, fractionDigits: '2' })
      expect(conformToMask('1,232323', numberFormat)).toEqual({ numberValue: 1.2323, fractionDigits: '2323' })
      expect(conformToMask('0', numberFormat)).toEqual({ numberValue: 0, fractionDigits: '' })
      expect(conformToMask('-0', numberFormat, '', false, true)).toEqual({ numberValue: -0, fractionDigits: '' })
      expect(conformToMask('-0,5', numberFormat, '', false, true)).toEqual({ numberValue: -0.5, fractionDigits: '5' })
      expect(conformToMask('1.000', numberFormat)).toEqual({ numberValue: 1000, fractionDigits: '' })
    })
  })

  describe('when auto decimal mode is enabled', () => {
    it('returns the expected result', () => {
      const numberFormat = new NumberFormat({ locale: 'nl', currency: 'EUR', precision: 2, autoDecimalMode: true })

      expect(conformToMask('', numberFormat, '', true)).toEqual('')
      expect(conformToMask('-', numberFormat, '', true, true)).toEqual({ numberValue: -0, fractionDigits: '00' })
      expect(conformToMask('-', numberFormat, '', true, false)).toEqual({ numberValue: 0, fractionDigits: '00' })
      expect(conformToMask('1', numberFormat, '', true)).toEqual({ numberValue: 0.01, fractionDigits: '01' })
      expect(conformToMask('12345', numberFormat, '', true)).toEqual({ numberValue: 123.45, fractionDigits: '45' })
      expect(conformToMask('-12345', numberFormat, '', true, true)).toEqual({ numberValue: -123.45, fractionDigits: '45' })
      expect(conformToMask('€ -12345', numberFormat, '', true, true)).toEqual({ numberValue: -123.45, fractionDigits: '45' })
      expect(conformToMask('-12345', numberFormat, '', true, false)).toEqual({ numberValue: 123.45, fractionDigits: '45' })
      expect(conformToMask('€ -12345', numberFormat, '', true, false)).toEqual({ numberValue: 123.45, fractionDigits: '45' })
      expect(conformToMask('00012345', numberFormat, '', true)).toEqual({ numberValue: 123.45, fractionDigits: '45' })
    })
  })

  describe('when the currency prefix contains the decimal symbol', () => {
    it('returns the expected result', () => {
      const numberFormat = new NumberFormat({ locale: 'de-CH', currency: { prefix: 'Fr. ' } })

      expect(conformToMask('Fr. 1.2', numberFormat)).toEqual({ numberValue: 1.2, fractionDigits: '2' })
      expect(conformToMask('-Fr. 0.5', numberFormat, '', false, true)).toEqual({ numberValue: -0.5, fractionDigits: '5' })
    })
  })

  describe('when the negative/positive prefixes have different white spaces', () => {
    it('returns the expected result', () => {
      expect(conformToMask('$-123.45', new NumberFormat({ locale: 'de-CH', currency: 'USD' }), '', false, true)).toEqual({ numberValue: -123.45, fractionDigits: '45' })
      expect(conformToMask('CHF-123.45', new NumberFormat({ locale: 'de-CH', currency: 'CHF' }), '', false, true)).toEqual({ numberValue: -123.45, fractionDigits: '45' })
    })
  })
})
