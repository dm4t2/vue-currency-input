import currencyFormatConfig from '../../src/utils/currencyFormatConfig'

// eslint-disable-next-line no-global-assign
Intl = require('Intl')

describe('currencyFormatConfig', () => {
  it('returns the correct config', () => {
    expect(currencyFormatConfig({ currency: 'EUR', locale: 'de' })).toMatchSnapshot()
    expect(currencyFormatConfig({ currency: 'USD', locale: 'en' })).toMatchSnapshot()
    expect(currencyFormatConfig({ currency: 'JPY', locale: 'fr' })).toMatchSnapshot()
  })
})
