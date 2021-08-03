import { CurrencyInput } from '../../src/currencyInput'
import { fireEvent } from '@testing-library/dom'

describe('Currency Input', () => {
  let el: HTMLInputElement, currencyInput: CurrencyInput
  beforeEach(() => {
    document.body.innerHTML = `<input>`
    el = document.querySelector('input') as HTMLInputElement
    currencyInput = new CurrencyInput(el, {
      locale: 'en',
      currency: 'EUR'
    })
  })

  describe('setValue', () => {
    it('should update the input value', () => {
      currencyInput.setValue(1)

      expect(el.value).toBe('€1')
    })
  })

  describe('on input', () => {
    it('should update the input value', () => {
      fireEvent.input(el, { target: { value: '1234' } })

      expect(el.value).toBe('€1,234')
    })
  })
})
