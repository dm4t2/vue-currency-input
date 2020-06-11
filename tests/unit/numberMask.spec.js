import NumberFormat from '../../src/numberFormat'
import { AutoDecimalModeNumberMask, DefaultNumberMask } from '../../src/numberMask'

describe('DefaultNumberMask', () => {
  describe('when the value is invalid', () => {
    it('should return an empty value', () => {
      const numberFormat = new NumberFormat({ locale: 'en', currency: 'USD' })

      expect(new DefaultNumberMask(numberFormat).conformToMask('', '$1')).toEqual('')
      expect(new DefaultNumberMask(numberFormat).conformToMask(' ', '$1')).toEqual('')
      expect(new DefaultNumberMask(numberFormat).conformToMask('foo', '$1')).toEqual('')
      expect(new DefaultNumberMask(numberFormat).conformToMask('$', '$1')).toEqual('')
      expect(new DefaultNumberMask(numberFormat).conformToMask('$a', '$1')).toEqual('')
    })
  })

  describe('when the fraction is invalid', () => {
    it('should return the previous conformed value', () => {
      const numberFormat = new NumberFormat({ locale: 'en', currency: 'USD' })

      expect(new DefaultNumberMask(numberFormat).conformToMask('1..', '$1')).toEqual('$1')
      expect(new DefaultNumberMask(numberFormat).conformToMask('1.a', '$1')).toEqual('$1')
    })
  })

  describe('when a invalid negative value is about to being entered', () => {
    describe('the currency symbol is hidden', () => {
      it('should return the previous conformed value', () => {
        const numberFormat = new NumberFormat({ locale: 'en', currency: null })

        expect(new DefaultNumberMask(numberFormat).conformToMask('-a', '-')).toEqual('-')
        expect(new DefaultNumberMask(numberFormat).conformToMask('--', '-')).toEqual('-')
      })
    })

    describe('the currency symbol is prefixed', () => {
      it('should return the previous conformed value', () => {
        const numberFormat = new NumberFormat({ locale: 'en', currency: 'USD' })

        expect(new DefaultNumberMask(numberFormat).conformToMask('-$a', '-$')).toEqual('-$')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-$-', '-$')).toEqual('-$')
      })
    })

    describe('the currency symbol is suffixed', () => {
      it('should return the previous conformed value', () => {
        const numberFormat = new NumberFormat({ locale: 'de', currency: 'USD' })

        expect(new DefaultNumberMask(numberFormat).conformToMask('-a $', '- $')).toEqual('- $')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-- $', '- $')).toEqual('- $')
      })
    })
  })

  describe('when the value is negative and the prefixed currency symbol is deleted', () => {
    it('should return an empty value', () => {
      const numberFormat = new NumberFormat({ locale: 'en', currency: 'USD' })
      expect(new DefaultNumberMask(numberFormat).conformToMask('-', '-$')).toEqual('')
    })
  })

  describe('when the value is incomplete', () => {
    describe('the digits are locale dependent', () => {
      it('should return the expected value', () => {
        const numberFormat = new NumberFormat({ locale: 'ar-SA', currency: null })

        expect(new DefaultNumberMask(numberFormat).conformToMask('٫١١')).toEqual('٠٫١١')
      })
    })

    describe('the currency symbol is hidden', () => {
      it('should return the expected value', () => {
        const numberFormat = new NumberFormat({ locale: 'en', currency: null })

        expect(new DefaultNumberMask(numberFormat).conformToMask('-')).toEqual('-')
        expect(new DefaultNumberMask(numberFormat).conformToMask('1.')).toEqual('1.')
        expect(new DefaultNumberMask(numberFormat).conformToMask('1234.')).toEqual('1234.')
        expect(new DefaultNumberMask(numberFormat).conformToMask('1,234.')).toEqual('1,234.')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-1.')).toEqual('-1.')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-1234.')).toEqual('-1234.')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-1,234.')).toEqual('-1,234.')
        expect(new DefaultNumberMask(numberFormat).conformToMask('.')).toEqual('0.')
        expect(new DefaultNumberMask(numberFormat).conformToMask('.1')).toEqual('0.1')
        expect(new DefaultNumberMask(numberFormat).conformToMask('.1.234')).toEqual('0.12')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-.')).toEqual('-0.')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-.1')).toEqual('-0.1')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-.1.234')).toEqual('-0.12')
      })
    })

    describe('the currency symbol is prefixed', () => {
      it('should return the expected value', () => {
        const numberFormat = new NumberFormat({ locale: 'en', currency: 'USD' })

        expect(new DefaultNumberMask(numberFormat).conformToMask('-')).toEqual('-$')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-$', '-$5')).toEqual('-$')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-', '-$')).toEqual('')
        expect(new DefaultNumberMask(numberFormat).conformToMask('1.')).toEqual('$1.')
        expect(new DefaultNumberMask(numberFormat).conformToMask('1234.')).toEqual('$1234.')
        expect(new DefaultNumberMask(numberFormat).conformToMask('1,234.')).toEqual('$1,234.')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-1.')).toEqual('-$1.')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-1234.')).toEqual('-$1234.')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-1,234.')).toEqual('-$1,234.')
        expect(new DefaultNumberMask(numberFormat).conformToMask('.')).toEqual('$0.')
        expect(new DefaultNumberMask(numberFormat).conformToMask('.1')).toEqual('$0.1')
        expect(new DefaultNumberMask(numberFormat).conformToMask('.1.234')).toEqual('$0.12')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-.')).toEqual('-$0.')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-.1')).toEqual('-$0.1')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-.1.234')).toEqual('-$0.12')
      })
    })

    describe('the currency symbol is suffixed', () => {
      it('should return the expected value', () => {
        const numberFormat = new NumberFormat({ locale: 'de', currency: 'USD' })

        expect(new DefaultNumberMask(numberFormat).conformToMask('-')).toEqual('- $')
        expect(new DefaultNumberMask(numberFormat).conformToMask('1,')).toEqual('1, $')
        expect(new DefaultNumberMask(numberFormat).conformToMask('1234,')).toEqual('1234, $')
        expect(new DefaultNumberMask(numberFormat).conformToMask('1.234,')).toEqual('1.234, $')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-1,')).toEqual('-1, $')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-1234,')).toEqual('-1234, $')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-1.234,')).toEqual('-1.234, $')
        expect(new DefaultNumberMask(numberFormat).conformToMask(',')).toEqual('0, $')
        expect(new DefaultNumberMask(numberFormat).conformToMask(',1')).toEqual('0,1 $')
        expect(new DefaultNumberMask(numberFormat).conformToMask(',1,234')).toEqual('0,12 $')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-,')).toEqual('-0, $')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-,1')).toEqual('-0,1 $')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-,1,234')).toEqual('-0,12 $')
      })
    })

    describe('no decimal digits are allowed', () => {
      it('should return the expected value', () => {
        const numberFormat = new NumberFormat({ locale: 'ja', currency: 'JPY' })

        expect(new DefaultNumberMask(numberFormat).conformToMask('1.')).toEqual({ numberValue: 1, fractionDigits: '' })
        expect(new DefaultNumberMask(numberFormat).conformToMask('1234.')).toEqual({ numberValue: 1234, fractionDigits: '' })
        expect(new DefaultNumberMask(numberFormat).conformToMask('1,234.')).toEqual({ numberValue: 1234, fractionDigits: '' })
        expect(new DefaultNumberMask(numberFormat).conformToMask('-1.')).toEqual({ numberValue: -1, fractionDigits: '' })
        expect(new DefaultNumberMask(numberFormat).conformToMask('-1234.')).toEqual({ numberValue: -1234, fractionDigits: '' })
        expect(new DefaultNumberMask(numberFormat).conformToMask('-1,234.')).toEqual({ numberValue: -1234, fractionDigits: '' })
        expect(new DefaultNumberMask(numberFormat).conformToMask('.')).toEqual('')
        expect(new DefaultNumberMask(numberFormat).conformToMask('.1')).toEqual({ numberValue: 1, fractionDigits: '' })
        expect(new DefaultNumberMask(numberFormat).conformToMask('.1.234')).toEqual({ numberValue: 1234, fractionDigits: '' })
        expect(new DefaultNumberMask(numberFormat).conformToMask('-.')).toEqual('')
        expect(new DefaultNumberMask(numberFormat).conformToMask('-.1')).toEqual({ numberValue: -1, fractionDigits: '' })
        expect(new DefaultNumberMask(numberFormat).conformToMask('-.1.234')).toEqual({ numberValue: -1234, fractionDigits: '' })
      })
    })
  })

  describe('when the value conforms to the mask', () => {
    it('should return the expected result', () => {
      const numberFormat = new NumberFormat({ locale: 'de', currency: 'USD', precision: 4 })

      expect(new DefaultNumberMask(numberFormat).conformToMask('1')).toEqual({ numberValue: 1, fractionDigits: '' })
      expect(new DefaultNumberMask(numberFormat).conformToMask('-1')).toEqual({ numberValue: -1, fractionDigits: '' })
      expect(new DefaultNumberMask(numberFormat).conformToMask('1,2')).toEqual({ numberValue: 1.2, fractionDigits: '2' })
      expect(new DefaultNumberMask(numberFormat).conformToMask('1,232323')).toEqual({ numberValue: 1.2323, fractionDigits: '2323' })
      expect(new DefaultNumberMask(numberFormat).conformToMask('0')).toEqual({ numberValue: 0, fractionDigits: '' })
      expect(new DefaultNumberMask(numberFormat).conformToMask('-0')).toEqual({ numberValue: -0, fractionDigits: '' })
      expect(new DefaultNumberMask(numberFormat).conformToMask('-0,5')).toEqual({ numberValue: -0.5, fractionDigits: '5' })
      expect(new DefaultNumberMask(numberFormat).conformToMask('1.000')).toEqual({ numberValue: 1000, fractionDigits: '' })
    })
  })

  describe('when the currency prefix contains the decimal symbol', () => {
    it('should return the expected result', () => {
      const numberFormat = new NumberFormat({ locale: 'de-CH', currency: { prefix: 'Fr. ' } })

      expect(new DefaultNumberMask(numberFormat).conformToMask('Fr. 1.2')).toEqual({ numberValue: 1.2, fractionDigits: '2' })
      expect(new DefaultNumberMask(numberFormat).conformToMask('-Fr. 0.5')).toEqual({ numberValue: -0.5, fractionDigits: '5' })
    })
  })

  describe('when the negative/positive prefixes have different white spaces', () => {
    it('should return the expected result', () => {
      expect(new DefaultNumberMask(new NumberFormat({ locale: 'de-CH', currency: 'USD' })).conformToMask('$-123.45')).toEqual({ numberValue: -123.45, fractionDigits: '45' })
      expect(new DefaultNumberMask(new NumberFormat({ locale: 'de-CH', currency: 'CHF' })).conformToMask('CHF-123.45')).toEqual({ numberValue: -123.45, fractionDigits: '45' })
    })
  })
})

describe('AutoDecimalModeNumberMask', () => {
  it('should return the expected result', () => {
    const numberFormat = new NumberFormat({ locale: 'nl', currency: 'EUR', precision: 2, autoDecimalMode: true })

    expect(new AutoDecimalModeNumberMask(numberFormat).conformToMask('')).toEqual('')
    expect(new AutoDecimalModeNumberMask(numberFormat).conformToMask('-')).toEqual({ numberValue: -0, fractionDigits: '00' })
    expect(new AutoDecimalModeNumberMask(numberFormat).conformToMask('1')).toEqual({ numberValue: 0.01, fractionDigits: '01' })
    expect(new AutoDecimalModeNumberMask(numberFormat).conformToMask('12345')).toEqual({ numberValue: 123.45, fractionDigits: '45' })
    expect(new AutoDecimalModeNumberMask(numberFormat).conformToMask('-12345')).toEqual({ numberValue: -123.45, fractionDigits: '45' })
    expect(new AutoDecimalModeNumberMask(numberFormat).conformToMask('€ -12345')).toEqual({ numberValue: -123.45, fractionDigits: '45' })
    expect(new AutoDecimalModeNumberMask(numberFormat).conformToMask('00012345')).toEqual({ numberValue: 123.45, fractionDigits: '45' })
  })
})
