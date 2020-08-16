import dispatchEvent from '@/utils/dispatchEvent'
import { getValue, setValue } from '@/api'

jest.mock('../../src/numberFormat')
jest.mock('../../src/utils/dispatchEvent')

describe('getValue', () => {
  it('should return the current number value of an input', () => {
    const el = document.createElement('input')
    el.$ci = { numberValue: 1234, options: { valueAsInteger: true }, currencyFormat: { maximumFractionDigits: 3 } }

    expect(getValue(el)).toBe(1234000)
  })
})

describe('setValue', () => {
  it('should set the value of an input', () => {
    const el = document.createElement('input')

    setValue(el, 1234)

    expect(dispatchEvent).toHaveBeenCalledWith(el, 'format', { value: 1234 })
  })
})
