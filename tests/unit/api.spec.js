import { DEFAULT_OPTIONS, getValue, parse, setValue } from '@/api'
import NumberFormat from '@/numberFormat'

jest.mock('../../src/numberFormat')

describe('getValue', () => {
  it('should return the current value of an input', () => {
    const el = { $ci: { getValue: jest.fn() } }

    getValue(el)

    expect(el.$ci.getValue).toHaveBeenCalled()
  })
})

describe('setValue', () => {
  it('should set the value of an input', () => {
    const el = { $ci: { setValue: jest.fn() } }

    setValue(el, 1234)

    expect(el.$ci.setValue).toHaveBeenCalledWith(1234)
  })
})

describe('parse', () => {
  it('should parse a number from a currency formatted string', () => {
    const formattedValue = '$1,234.50'
    const locale = 'en'
    const currency = 'USD'
    const valueAsInteger = true

    parse(formattedValue, { locale, currency, valueAsInteger })

    expect(NumberFormat).toHaveBeenCalledWith({ ...DEFAULT_OPTIONS, locale, currency, valueAsInteger })
    expect(NumberFormat.mock.instances[0].parse).toHaveBeenCalledWith(formattedValue, true)
  })
})
