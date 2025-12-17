import CurrencyFormat from '../../src/currencyFormat'
import { AutoDecimalDigitsInputMask, DefaultInputMask } from '../../src/inputMask'
import { describe, expect, it } from 'vitest'

describe('DefaultInputMask', () => {
  describe('when the value is invalid', () => {
    it('should return an empty value', () => {
      const currencyFormat = new CurrencyFormat({ locale: 'en', currency: 'USD' })

      expect(new DefaultInputMask(currencyFormat).conformToMask('', '$1')).toEqual('')
      expect(new DefaultInputMask(currencyFormat).conformToMask(' ', '$1')).toEqual('')
      expect(new DefaultInputMask(currencyFormat).conformToMask('foo', '$1')).toEqual('')
      expect(new DefaultInputMask(currencyFormat).conformToMask('$', '$1')).toEqual('')
      expect(new DefaultInputMask(currencyFormat).conformToMask('$a', '$1')).toEqual('')
    })
  })

  describe('when the fraction is invalid', () => {
    it('should return the previous conformed value', () => {
      const currencyFormat = new CurrencyFormat({ locale: 'en', currency: 'USD' })

      expect(new DefaultInputMask(currencyFormat).conformToMask('1..', '$1')).toEqual('$1')
      expect(new DefaultInputMask(currencyFormat).conformToMask('1.a', '$1')).toEqual('$1')
    })
  })

  describe('when a invalid negative value is about to being entered', () => {
    describe('the currency symbol is prefixed', () => {
      it('should return the previous conformed value', () => {
        const currencyFormat = new CurrencyFormat({ locale: 'en', currency: 'USD' })

        expect(new DefaultInputMask(currencyFormat).conformToMask('-$a', '-$')).toEqual('-$')
        expect(new DefaultInputMask(currencyFormat).conformToMask('-$-', '-$')).toEqual('-$')
        expect(new DefaultInputMask(new CurrencyFormat({ locale: 'en', currency: 'USD', accountingSign: true })).conformToMask('($a)', '($)')).toEqual('($)')
      })
    })

    describe('the currency symbol is suffixed', () => {
      it('should return the previous conformed value', () => {
        const currencyFormat = new CurrencyFormat({ locale: 'de', currency: 'USD' })

        expect(new DefaultInputMask(currencyFormat).conformToMask('-a $', '- $')).toEqual('- $')
        expect(new DefaultInputMask(currencyFormat).conformToMask('-- $', '- $')).toEqual('- $')
      })
    })
  })

  describe('when the value is negative and the prefixed currency symbol is deleted', () => {
    it('should return an empty value', () => {
      expect(new DefaultInputMask(new CurrencyFormat({ locale: 'en', currency: 'USD' })).conformToMask('-', '-$')).toEqual('')
      expect(new DefaultInputMask(new CurrencyFormat({ locale: 'en', currency: 'USD', accountingSign: true })).conformToMask('()', '($)')).toEqual('')
    })
  })

  describe('when the value is incomplete', () => {
    // TODO: fix parsing of negative numbers in Arabic
    // describe('the digits are locale dependent', () => {
    //   it('should return the expected value', () => {
    //     const currencyFormat = new CurrencyFormat({ locale: 'ar-SA', currency: 'USD' })
    //     expect(new DefaultInputMask(currencyFormat).conformToMask('٫١١')).toEqual('...')
    //   })
    // })

    describe('the currency symbol is prefixed', () => {
      it('should return the expected value', () => {
        const currencyFormat = new CurrencyFormat({ locale: 'en', currency: 'USD' })

        expect(new DefaultInputMask(currencyFormat).conformToMask('-')).toEqual('-$')
        expect(new DefaultInputMask(currencyFormat).conformToMask('-$', '-$5')).toEqual('-$')
        expect(new DefaultInputMask(currencyFormat).conformToMask('-', '-$')).toEqual('')
        expect(new DefaultInputMask(currencyFormat).conformToMask('1.')).toEqual('$1.')
        expect(new DefaultInputMask(currencyFormat).conformToMask('1234.')).toEqual('$1234.')
        expect(new DefaultInputMask(currencyFormat).conformToMask('1,234.')).toEqual('$1,234.')
        expect(new DefaultInputMask(currencyFormat).conformToMask('-1.')).toEqual('-$1.')
        expect(new DefaultInputMask(currencyFormat).conformToMask('-1234.')).toEqual('-$1234.')
        expect(new DefaultInputMask(currencyFormat).conformToMask('-1,234.')).toEqual('-$1,234.')
        expect(new DefaultInputMask(currencyFormat).conformToMask('.')).toEqual('$0.')
        expect(new DefaultInputMask(currencyFormat).conformToMask('.1')).toEqual('$0.1')
        expect(new DefaultInputMask(currencyFormat).conformToMask('.1.234')).toEqual('$0.12')
        expect(new DefaultInputMask(currencyFormat).conformToMask('-.')).toEqual('-$0.')
        expect(new DefaultInputMask(currencyFormat).conformToMask('-.1')).toEqual('-$0.1')
        expect(new DefaultInputMask(currencyFormat).conformToMask('-.1.234')).toEqual('-$0.12')
      })
    })

    describe('the currency symbol is suffixed', () => {
      it('should return the expected value', () => {
        const currencyFormat = new CurrencyFormat({ locale: 'de', currency: 'USD' })

        expect(new DefaultInputMask(currencyFormat).conformToMask('-')).toEqual('- $')
        expect(new DefaultInputMask(currencyFormat).conformToMask('1,')).toEqual('1, $')
        expect(new DefaultInputMask(currencyFormat).conformToMask('1234,')).toEqual('1234, $')
        expect(new DefaultInputMask(currencyFormat).conformToMask('1.234,')).toEqual('1.234, $')
        expect(new DefaultInputMask(currencyFormat).conformToMask('-1,')).toEqual('-1, $')
        expect(new DefaultInputMask(currencyFormat).conformToMask('-1234,')).toEqual('-1234, $')
        expect(new DefaultInputMask(currencyFormat).conformToMask('-1.234,')).toEqual('-1.234, $')
        expect(new DefaultInputMask(currencyFormat).conformToMask(',')).toEqual('0, $')
        expect(new DefaultInputMask(currencyFormat).conformToMask(',1')).toEqual('0,1 $')
        expect(new DefaultInputMask(currencyFormat).conformToMask(',1,234')).toEqual('0,12 $')
        expect(new DefaultInputMask(currencyFormat).conformToMask('-,')).toEqual('-0, $')
        expect(new DefaultInputMask(currencyFormat).conformToMask('-,1')).toEqual('-0,1 $')
        expect(new DefaultInputMask(currencyFormat).conformToMask('-,1,234')).toEqual('-0,12 $')
      })
    })

    describe('no decimal digits are allowed', () => {
      it('should return the expected value', () => {
        const currencyFormat = new CurrencyFormat({ locale: 'ja', currency: 'JPY' })

        expect(new DefaultInputMask(currencyFormat).conformToMask('1.')).toEqual({ numberValue: 1, fractionDigits: '' })
        expect(new DefaultInputMask(currencyFormat).conformToMask('1234.')).toEqual({ numberValue: 1234, fractionDigits: '' })
        expect(new DefaultInputMask(currencyFormat).conformToMask('1,234.')).toEqual({ numberValue: 1234, fractionDigits: '' })
        expect(new DefaultInputMask(currencyFormat).conformToMask('-1.')).toEqual({ numberValue: -1, fractionDigits: '' })
        expect(new DefaultInputMask(currencyFormat).conformToMask('-1234.')).toEqual({ numberValue: -1234, fractionDigits: '' })
        expect(new DefaultInputMask(currencyFormat).conformToMask('-1,234.')).toEqual({ numberValue: -1234, fractionDigits: '' })
        expect(new DefaultInputMask(currencyFormat).conformToMask('.')).toEqual('')
        expect(new DefaultInputMask(currencyFormat).conformToMask('.1')).toEqual({ numberValue: 1, fractionDigits: '' })
        expect(new DefaultInputMask(currencyFormat).conformToMask('.1.234')).toEqual({ numberValue: 1234, fractionDigits: '' })
        expect(new DefaultInputMask(currencyFormat).conformToMask('-.')).toEqual('')
        expect(new DefaultInputMask(currencyFormat).conformToMask('-.1')).toEqual({ numberValue: -1, fractionDigits: '' })
        expect(new DefaultInputMask(currencyFormat).conformToMask('-.1.234')).toEqual({ numberValue: -1234, fractionDigits: '' })
      })
    })
  })

  describe('when the value conforms to the mask', () => {
    it('should return the expected result', () => {
      const currencyFormat = new CurrencyFormat({ locale: 'de', currency: 'USD', precision: 4 })

      expect(new DefaultInputMask(currencyFormat).conformToMask('1')).toEqual({ numberValue: 1, fractionDigits: '' })
      expect(new DefaultInputMask(currencyFormat).conformToMask('-1')).toEqual({ numberValue: -1, fractionDigits: '' })
      expect(new DefaultInputMask(currencyFormat).conformToMask('1,2')).toEqual({ numberValue: 1.2, fractionDigits: '2' })
      expect(new DefaultInputMask(currencyFormat).conformToMask('1,232323')).toEqual({ numberValue: 1.2323, fractionDigits: '2323' })
      expect(new DefaultInputMask(currencyFormat).conformToMask('0')).toEqual({ numberValue: 0, fractionDigits: '' })
      expect(new DefaultInputMask(currencyFormat).conformToMask('-0')).toEqual({ numberValue: -0, fractionDigits: '' })
      expect(new DefaultInputMask(currencyFormat).conformToMask('-0,5')).toEqual({ numberValue: -0.5, fractionDigits: '5' })
      expect(new DefaultInputMask(currencyFormat).conformToMask('1.000')).toEqual({ numberValue: 1000, fractionDigits: '' })
    })
  })

  describe('when the negative/positive prefixes have different white spaces', () => {
    it('should return the expected result', () => {
      expect(new DefaultInputMask(new CurrencyFormat({ locale: 'de-CH', currency: 'USD' })).conformToMask('$-123.45')).toEqual({
        numberValue: -123.45,
        fractionDigits: '45'
      })
      expect(new DefaultInputMask(new CurrencyFormat({ locale: 'de-CH', currency: 'CHF' })).conformToMask('CHF-123.45')).toEqual({
        numberValue: -123.45,
        fractionDigits: '45'
      })
    })
  })
})

describe('AutoDecimalDigitsInputMask', () => {
  it('should return the expected result', () => {
    const currencyFormat = new CurrencyFormat({ locale: 'nl', currency: 'EUR' })

    expect(new AutoDecimalDigitsInputMask(currencyFormat).conformToMask('')).toEqual('')
    expect(new AutoDecimalDigitsInputMask(currencyFormat).conformToMask(',')).toEqual('')
    expect(new AutoDecimalDigitsInputMask(currencyFormat).conformToMask('0,0', '0,00')).toEqual('')
    expect(new AutoDecimalDigitsInputMask(currencyFormat).conformToMask('-')).toEqual({ numberValue: -0, fractionDigits: '00' })
    expect(new AutoDecimalDigitsInputMask(currencyFormat).conformToMask('1')).toEqual({ numberValue: 0.01, fractionDigits: '01' })
    expect(new AutoDecimalDigitsInputMask(currencyFormat).conformToMask('12345')).toEqual({ numberValue: 123.45, fractionDigits: '45' })
    expect(new AutoDecimalDigitsInputMask(currencyFormat).conformToMask('-12345')).toEqual({ numberValue: -123.45, fractionDigits: '45' })
    expect(new AutoDecimalDigitsInputMask(currencyFormat).conformToMask('€ -12345')).toEqual({ numberValue: -123.45, fractionDigits: '45' })
    expect(new AutoDecimalDigitsInputMask(currencyFormat).conformToMask('00012345')).toEqual({ numberValue: 123.45, fractionDigits: '45' })
  })
})
