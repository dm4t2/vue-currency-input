import createCurrencyFormat from '../../src/utils/createCurrencyFormat'

describe('createCurrencyFormat', () => {
  describe('i18n', () => {
    it('de-DE_EUR', () => {
      expect(createCurrencyFormat({ locale: 'de-DE', currency: 'EUR' })).toMatchSnapshot()
    })

    it('de-CH_EUR', () => {
      expect(createCurrencyFormat({ locale: 'de-CH', currency: 'USD' })).toMatchSnapshot()
    })

    it('es-ES_EUR', () => {
      expect(createCurrencyFormat({ locale: 'es-ES', currency: 'EUR' })).toMatchSnapshot()
    })

    it('nl-NL_EUR', () => {
      expect(createCurrencyFormat({ locale: 'nl-NL', currency: 'EUR' })).toMatchSnapshot()
    })

    it('en-US_USD', () => {
      expect(createCurrencyFormat({ locale: 'en-US', currency: 'USD' })).toMatchSnapshot()
    })

    it('zh_CNY', () => {
      expect(createCurrencyFormat({ locale: 'zh', currency: 'CNY' })).toMatchSnapshot()
    })

    it('en-GB_GBP', () => {
      expect(createCurrencyFormat({ locale: 'en-GB', currency: 'GBP' })).toMatchSnapshot()
    })

    it('en-IN_INR', () => {
      expect(createCurrencyFormat({ locale: 'en-GB', currency: 'INR' })).toMatchSnapshot()
    })

    it('pt_BRL', () => {
      expect(createCurrencyFormat({ locale: 'pt', currency: 'BRL' })).toMatchSnapshot()
    })

    it('ja_JPY', () => {
      expect(createCurrencyFormat({ locale: 'ja', currency: 'JPY' })).toMatchSnapshot()
    })

    it('ar-SA_SAR', () => {
      expect(createCurrencyFormat({ locale: 'ar-SA', currency: 'SAR' })).toMatchSnapshot()
    })
  })

  it('custom prefix/suffix', () => {
    expect(createCurrencyFormat({ locale: 'de-DE', currency: { prefix: '₿ ' } })).toMatchSnapshot()
    expect(createCurrencyFormat({ locale: 'de-DE', currency: { suffix: ' Euro' } })).toMatchSnapshot()
    expect(createCurrencyFormat({ locale: 'de-DE', currency: null })).toMatchSnapshot()
  })

  it('custom precision', () => {
    expect(createCurrencyFormat({ locale: 'de-DE', currency: 'EUR', precision: 0 })).toMatchSnapshot()
    expect(createCurrencyFormat({ locale: 'de-DE', currency: 'EUR', precision: { min: 0, max: 0 } })).toMatchSnapshot()
    expect(createCurrencyFormat({ locale: 'de-DE', currency: null, precision: { min: 0, max: 2 } })).toMatchSnapshot()
    expect(createCurrencyFormat({ locale: 'de-DE', currency: { suffix: ' €' }, precision: { min: 0, max: 2 } })).toMatchSnapshot()
    expect(createCurrencyFormat({ locale: 'ja', currency: 'JPY', precision: { min: 2, max: 2 } })).toMatchSnapshot()
  })
})
