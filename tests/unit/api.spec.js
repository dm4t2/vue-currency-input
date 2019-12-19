import { DEFAULT_OPTIONS, parseCurrency, setValue } from '../../src/api'
import createCurrencyFormat from '../../src/utils/createCurrencyFormat'
import parse from '../../src/utils/parse'
import dispatchEvent from '../../src/utils/dispatchEvent'

jest.mock('../../src/utils/parse')
jest.mock('../../src/utils/createCurrencyFormat')
jest.mock('../../src/utils/dispatchEvent')

describe('parseCurrency', () => {
  it('delegates to the internal parse method with the expected arguments', () => {
    const formattedValue = '$1,234.50'
    const locale = 'en'
    const currency = 'USD'

    parseCurrency(formattedValue, { locale, currency })

    expect(parse).toHaveBeenCalled()
    expect(parse.mock.calls[0][0]).toBe(formattedValue)
    expect(createCurrencyFormat).toHaveBeenCalledWith({ ...DEFAULT_OPTIONS, locale, currency })
  })
})

describe('setValue', () => {
  it('dispatches a format event on the given input', () => {
    const el = document.createElement('input')

    setValue(el, 1234)

    expect(dispatchEvent).toHaveBeenCalledWith(el, 'format', { value: 1234 })
  })
})
