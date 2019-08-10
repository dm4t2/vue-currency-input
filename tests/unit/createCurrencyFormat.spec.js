import Intl from 'intl'
import createCurrencyFormat from '../../src/utils/createCurrencyFormat'

global.Intl = Intl

describe('createCurrencyFormat', () => {
  it('returns the expected format config', () => {
    expect(createCurrencyFormat({ locale: 'de', currency: 'EUR' })).toMatchSnapshot()
    expect(createCurrencyFormat({ locale: 'en', currency: 'USD' })).toMatchSnapshot()
    expect(createCurrencyFormat({ locale: 'zh', currency: 'CNY' })).toMatchSnapshot()
    expect(createCurrencyFormat({ locale: 'en', currency: 'GBP' })).toMatchSnapshot()
    expect(createCurrencyFormat({ locale: 'pt', currency: 'BRL' })).toMatchSnapshot()
    expect(createCurrencyFormat({ locale: 'fr', currency: 'JPY' })).toMatchSnapshot()
  })
})
