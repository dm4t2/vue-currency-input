import Intl from 'intl'
import currencyFormatConfig from '../../src/utils/currencyFormatConfig'

global.Intl = Intl

describe('currencyFormatConfig', () => {
  it('returns the correct config', () => {
    expect(currencyFormatConfig('de', 'EUR')).toMatchSnapshot()
    expect(currencyFormatConfig('en', 'USD')).toMatchSnapshot()
    expect(currencyFormatConfig('fr', 'JPY')).toMatchSnapshot()
  })
})
