import Intl from 'intl'
import createCurrencyFormat from '../../src/utils/createCurrencyFormat'

global.Intl = Intl

describe('createCurrencyFormat', () => {
  it('returns the expected format config', () => {
    expect(createCurrencyFormat({ locale: 'de', currency: 'EUR', min: null })).toMatchSnapshot()
    expect(createCurrencyFormat({ locale: 'en', currency: 'USD', min: 0 })).toMatchSnapshot()
    expect(createCurrencyFormat({ locale: 'zh', currency: 'CNY', min: -100 })).toMatchSnapshot()
    expect(createCurrencyFormat({ locale: 'en', currency: 'GBP', max: 0 })).toMatchSnapshot()
    expect(createCurrencyFormat({ locale: 'pt', currency: 'BRL', max: 10 })).toMatchSnapshot()
    expect(createCurrencyFormat({ locale: 'fr', currency: 'JPY', min: 500 })).toMatchSnapshot()
  })
})
