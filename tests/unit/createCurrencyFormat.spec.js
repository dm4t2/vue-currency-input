import Intl from 'intl'
import createCurrencyFormat from '../../src/utils/createCurrencyFormat'

global.Intl = Intl

describe('createCurrencyFormat', () => {
  it('de_EUR', () => {
    expect(createCurrencyFormat({ locale: 'de', currency: 'EUR' })).toMatchSnapshot()
  })

  it('es_EUR', () => {
    expect(createCurrencyFormat({ locale: 'es', currency: 'EUR' })).toMatchSnapshot()
  })

  it('en_USD', () => {
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
