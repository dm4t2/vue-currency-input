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
    it('should return null if the value is empty', () => {
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).parse(null)).toBeNull()
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).parse('')).toBeNull()
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).parse(' ')).toBeNull()
    })

    it('should return null if the value is invalid', () => {
      expect(new CurrencyFormat({ currency: 'EUR', locale: 'en' }).parse('-')).toBeNull()
      expect(new CurrencyFormat({ currency: 'EUR', locale: 'en' }).parse('123e-1')).toBeNull()
      expect(new CurrencyFormat({ currency: 'EUR', locale: 'en' }).parse('0x11')).toBeNull()
      expect(new CurrencyFormat({ currency: 'EUR', locale: 'en' }).parse('0b11')).toBeNull()
      expect(new CurrencyFormat({ currency: 'EUR', locale: 'en' }).parse('0o11')).toBeNull()
      expect(new CurrencyFormat({ currency: 'EUR', locale: 'en' }).parse('1.2e1')).toBeNull()
      expect(new CurrencyFormat({ currency: 'EUR', locale: 'en' }).parse('1.23.4')).toBeNull()
    })

    it('should return the parsed number if the value conforms to the currency format', () => {
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).parse('1234')).toBe(1234)
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).parse('1,234,567')).toBe(1234567)
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).parse('-1,234,567')).toBe(-1234567)
      expect(new CurrencyFormat({ locale: 'de', currency: 'EUR' }).parse('-1234567,89')).toBe(-1234567.89)
      expect(new CurrencyFormat({ locale: 'en', currency: 'USD' }).parse('$1,234,567')).toBe(1234567)
      expect(new CurrencyFormat({ locale: 'de', currency: 'EUR' }).parse('1234 €')).toBe(1234)
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).parse('-1234')).toBe(-1234)
      expect(new CurrencyFormat({ locale: 'en', currency: 'USD' }).parse('-$1234')).toBe(-1234)
      expect(new CurrencyFormat({ locale: 'de', currency: 'EUR' }).parse('-1234 €')).toBe(-1234)
      expect(new CurrencyFormat({ locale: 'ja', currency: 'JPY' }).parse('￥123,456')).toBe(123456)
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).parse('0.5')).toBe(0.5)
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).parse('1234.50')).toBe(1234.5)
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).parse('1234.00')).toBe(1234)
      expect(new CurrencyFormat({ locale: 'en', currency: 'USD' }).parse('$1,234.50')).toBe(1234.5)
      expect(new CurrencyFormat({ locale: 'de', currency: 'EUR' }).parse('1.234,50 €')).toBe(1234.5)
      expect(new CurrencyFormat({ locale: 'ar', currency: 'SAR' }).parse('١٢٣٤')).toBe(1234)
      expect(new CurrencyFormat({ locale: 'ar', currency: 'SAR' }).parse('١٬٢٣٤')).toBe(1234)
      expect(new CurrencyFormat({ locale: 'ar', currency: 'SAR' }).parse('٠٫٩')).toBe(0.9)
      expect(new CurrencyFormat({ locale: 'ar', currency: 'SAR' }).parse('؜-٠٫٥٠ ر.س.‏')).toBe(-0.5)
      expect(new CurrencyFormat({ locale: 'en-IN', currency: 'INR' }).parse('₹1,23,334.00')).toBe(123334)
      expect(new CurrencyFormat({ locale: 'en-IN', currency: 'INR' }).parse('₹123334.00')).toBe(123334)
      expect(new CurrencyFormat({ locale: 'de-AT', currency: 'EUR' }).parse('€ 66.668')).toBe(66668)
      expect(new CurrencyFormat({ locale: 'de-DE', currency: 'USD', currencyDisplay: CurrencyDisplay.name }).parse('1.234,50 US-Dollar')).toBe(1234.5)
      expect(new CurrencyFormat({ locale: 'en', currency: 'USD', accountingSign: true }).parse('(1,234.50)')).toBe(-1234.5)
    })

    it('should return null if the value does not conform to the currency format', () => {
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).parse('1234,5')).toBeNull()
      expect(new CurrencyFormat({ locale: 'de', currency: 'EUR' }).parse('1,234,567.89')).toBeNull()
      expect(new CurrencyFormat({ locale: 'de', currency: 'EUR' }).parse('$1234')).toBeNull()
      expect(new CurrencyFormat({ locale: 'en', currency: 'USD' }).parse('1234 €')).toBeNull()
      expect(new CurrencyFormat({ locale: 'ja', currency: 'JPY' }).parse('1234.56')).toBeNull()
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
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).format(1234.5789)).toBe('€1,234.58')
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR' }).format(1234.5789, { minimumFractionDigits: 4 })).toBe('€1,234.5789')
    })

    it('should apply the custom percision range', () => {
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR', precision: { min: 0, max: 4 } }).format(1234)).toBe('€1,234')
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR', precision: { min: 0, max: 4 } }).format(1234.5)).toBe('€1,234.5')
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR', precision: { min: 0, max: 4 } }).format(1234.57)).toBe('€1,234.57')
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR', precision: { min: 0, max: 4 } }).format(1234.578)).toBe('€1,234.578')
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR', precision: { min: 0, max: 4 } }).format(1234.5789)).toBe('€1,234.5789')
      expect(new CurrencyFormat({ locale: 'en', currency: 'EUR', precision: { min: 0, max: 4 } }).format(1234.57891)).toBe('€1,234.5789')
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
