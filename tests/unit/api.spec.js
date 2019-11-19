import { parseCurrency } from '../../src/api'
import createCurrencyFormat from '../../src/utils/createCurrencyFormat'
import parse from '../../src/utils/parse'

jest.mock('../../src/utils/parse')
jest.mock('../../src/utils/createCurrencyFormat')

describe('parseCurrency', () => {
  it('delegates to the internal parse method with the expected arguments', () => {
    const formattedValue = '$1,234.50'
    const locale = 'en'
    const currency = 'USD'

    parseCurrency(formattedValue, { locale, currency })

    expect(parse).toHaveBeenCalled()
    expect(parse.mock.calls[0][0]).toBe(formattedValue)
    expect(createCurrencyFormat).toHaveBeenCalledWith({ locale, currency })
  })
})
