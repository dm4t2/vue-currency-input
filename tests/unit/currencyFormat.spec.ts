import CurrencyFormat from '../../src/currencyFormat'
import { CurrencyDisplay } from '../../src'
import { describe, expect, it } from 'vitest'

describe('CurrencyFormat', () => {
  describe('constructing number formats', () => {
    it('should work for respective locale and currency', () => {
      expect(new CurrencyFormat({ locale: 'de-DE', currency: 'EUR' })).toMatchSnapshot('de-DE_EUR')
      expect(new CurrencyFormat({ locale: 'de-CH', currency: 'EUR' })).toMatchSnapshot('de-CH_EUR')
      expect(new CurrencyFormat({ locale: 'es-ES', currency: 'EUR' })).toMatchSnapshot('es-ES_EUR')
      expect(new CurrencyFormat({ locale: 'nl-NL', currency: 'EUR' })).toMatchSnapshot('nl-NL_EUR')
      expect(new CurrencyFormat({ locale: 'en-US', currency: 'USD' })).toMatchSnapshot('en-US_USD')
      expect(new CurrencyFormat({ locale: 'fr-CH', currency: 'CHF' })).toMatchSnapshot('fr-CH_CHF')
      expect(new CurrencyFormat({ locale: 'zh', currency: 'CNY' })).toMatchSnapshot('zh_CNY')
      expect(new CurrencyFormat({ locale: 'en-GB', currency: 'GBP' })).toMatchSnapshot('en-GB_GBP')
      expect(new CurrencyFormat({ locale: 'en-GB', currency: 'INR' })).toMatchSnapshot('en-IN_INR')
      expect(new CurrencyFormat({ locale: 'pt', currency: 'BRL' })).toMatchSnapshot('pt_BRL')
      expect(new CurrencyFormat({ locale: 'ja', currency: 'JPY' })).toMatchSnapshot('ja_JPY')
      expect(new CurrencyFormat({ locale: 'ar-SA', currency: 'SAR' })).toMatchSnapshot('ar-SA_SAR')
      expect(new CurrencyFormat({ locale: 'fa-IR', currency: 'IRR' })).toMatchSnapshot('fa-IR_IRR')
      expect(new CurrencyFormat({ locale: 'bg-BG', currency: 'BGN' })).toMatchSnapshot('bg-BG_BGN')
    })

    describe('custom precision', () => {
      it('should work with a custom precision', () => {
        expect(new CurrencyFormat({ currency: 'EUR', precision: 0 })).toEqual(expect.objectContaining({ minimumFractionDigits: 0, maximumFractionDigits: 0 }))
      })

      it('should work with a custom precision range', () => {
        expect(new CurrencyFormat({ currency: 'EUR', precision: { min: 0, max: 4 } })).toEqual(
          expect.objectContaining({ minimumFractionDigits: 0, maximumFractionDigits: 4 })
        )
      })

      it('should ignore the custom precision if the locale does not support decimal digits', () => {
        expect(new CurrencyFormat({ locale: 'ja', currency: 'JPY', precision: 2 })).toEqual(
          expect.objectContaining({ minimumFractionDigits: 0, maximumFractionDigits: 0 })
        )
      })
    })
  })

  describe('parse', () => {
    it('should return null if the value is empty or invalid', () => {
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).parse(null)).toBeNull()
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).parse('')).toBeNull()
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).parse(' ')).toBeNull()
      expect(new CurrencyFormat({ currency: 'EUR', locale: 'en' }).parse('-')).toBeNull()
    })

    it('should return the parsed number if the value conforms to the currency format', () => {
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).parse('1234')).toBe(123400n)
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).parse('1,234,567')).toBe(123456700n)
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).parse('-1,234,567')).toBe(-123456700n)
      expect(new CurrencyFormat({ locale: 'de', currency: 'EUR' }).parse('-1234567,89')).toBe(-123456789n)
      expect(new CurrencyFormat({ locale: 'en', currency: 'USD' }).parse('$1,234,567')).toBe(123456700n)
      expect(new CurrencyFormat({ locale: 'de', currency: 'EUR' }).parse('1234 €')).toBe(123400n)
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).parse('-1234')).toBe(-123400n)
      expect(new CurrencyFormat({ locale: 'en', currency: 'USD' }).parse('-$1234')).toBe(-123400n)
      expect(new CurrencyFormat({ locale: 'de', currency: 'EUR' }).parse('-1234 €')).toBe(-123400n)
      expect(new CurrencyFormat({ locale: 'ja', currency: 'JPY' }).parse('￥123,456')).toBe(123456n)
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).parse('0.5')).toBe(50n)
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).parse('1234.50')).toBe(123450n)
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).parse('1234.00')).toBe(123400n)
      expect(new CurrencyFormat({ locale: 'en', currency: 'USD' }).parse('$1,234.50')).toBe(123450n)
      expect(new CurrencyFormat({ locale: 'de', currency: 'EUR' }).parse('1.234,50 €')).toBe(123450n)
      expect(new CurrencyFormat({ locale: 'ar', currency: 'SAR' }).parse('١٢٣٤')).toBe(123400n)
      expect(new CurrencyFormat({ locale: 'ar', currency: 'SAR' }).parse('١٬٢٣٤')).toBe(123400n)
      expect(new CurrencyFormat({ locale: 'ar', currency: 'SAR' }).parse('٠٫٩')).toBe(90n)
      expect(new CurrencyFormat({ locale: 'ar', currency: 'SAR' }).parse('-‏٠٫٥٠ ر.س.')).toBe(-50n)
      expect(new CurrencyFormat({ locale: 'en-IN', currency: 'INR' }).parse('₹1,23,334.00')).toBe(12333400n)
      expect(new CurrencyFormat({ locale: 'en-IN', currency: 'INR' }).parse('₹123334.00')).toBe(12333400n)
      expect(new CurrencyFormat({ locale: 'de-AT', currency: 'EUR' }).parse('€ 66.668')).toBe(6666800n)
      expect(new CurrencyFormat({ locale: 'de-DE', currency: 'USD', currencyDisplay: CurrencyDisplay.name }).parse('1.234,50 US-Dollar')).toBe(123450n)
      expect(new CurrencyFormat({ locale: 'en', currency: 'USD', accountingSign: true }).parse('(1,234.50)')).toBe(-123450n)
    })
  })

  describe('isFractionIncomplete', () => {
    it('should return true if the fraction is incomplete', () => {
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).isFractionIncomplete('1234.')).toBe(true)
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).isFractionIncomplete('1234')).toBe(false)
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).isFractionIncomplete('1234.3')).toBe(false)
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).isFractionIncomplete('1234.3.')).toBe(false)
      expect(new CurrencyFormat({ locale: 'de', currency: 'EUR' }).isFractionIncomplete('1,3,')).toBe(false)
    })
  })

  describe('normalizeDecimalSymbol', () => {
    it('should replace the first decimal symbol with the one of the current locale', () => {
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).normalizeDecimalSeparator('1,23,4,567', 2)).toBe('1,23.4,567')
    })
  })

  describe('format', () => {
    it('should return the formatted value for the respective options', () => {
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).format(null)).toBe('')
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).format(1n)).toBe('€0.01')
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).format(100n, { minimumFractionDigits: 0, maximumFractionDigits: 2 })).toBe('€1')
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).format(0n, { minimumFractionDigits: 1, maximumFractionDigits: 2 })).toBe('€0.0')
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).format(120n, { minimumFractionDigits: 1, maximumFractionDigits: 2 })).toBe('€1.2')
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).format(100n, { minimumFractionDigits: 0, maximumFractionDigits: 0 })).toBe('€1')
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).format(12345789n)).toBe('€123,457.89')
      expect(new CurrencyFormat({ locale: 'en', currency: 'JPY' }).format(12345789n)).toBe('¥12,345,789')
    })

    it('should apply the custom precision range', () => {
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR', precision: { min: 0, max: 4 } }).format(1234n)).toBe('€0.1234')
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR', precision: { min: 0, max: 4 } }).format(12345n)).toBe('€1.2345')
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR', precision: { min: 0, max: 4 } }).format(123457n)).toBe('€12.3457')
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR', precision: { min: 0, max: 4 } }).format(1234578n)).toBe('€123.4578')
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR', precision: { min: 0, max: 4 } }).format(12345789n)).toBe('€1,234.5789')
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR', precision: { min: 0, max: 4 } }).format(123457891n)).toBe('€12,345.7891')
    })
  })

  describe('isNegative', () => {
    it('should check if a formatted value is negative or not', () => {
      expect(new CurrencyFormat({ locale: 'en', currency: 'USD', accountingSign: true }).isNegative('($1)')).toBe(true)
      expect(new CurrencyFormat({ locale: 'en', currency: 'USD', accountingSign: true }).isNegative('(1)')).toBe(true)
      expect(new CurrencyFormat({ locale: 'en', currency: 'USD', accountingSign: true }).isNegative('-1')).toBe(true)
      expect(new CurrencyFormat({ locale: 'sv', currency: 'EUR' }).isNegative('-1.')).toBe(true)
    })
  })
})
