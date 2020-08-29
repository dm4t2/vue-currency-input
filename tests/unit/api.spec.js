import { getValue, setValue } from '@/api'

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
