import Intl from 'intl'
import createCurrencyFormat from '../../src/utils/createCurrencyFormat'

global.Intl = Intl

describe('createCurrencyFormat', () => {
  it('de-DE_EUR', () => {
    expect(createCurrencyFormat({ locale: 'de-DE', currency: 'EUR' })).toMatchSnapshot()
  })

  it('es-ES_EUR', () => {
    expect(createCurrencyFormat({ locale: 'es-ES', currency: 'EUR' })).toMatchSnapshot()
  })

  it('nl-NL_EUR', () => {
    expect(createCurrencyFormat({ locale: 'nl-NL', currency: 'USD' })).toMatchSnapshot()
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
})
