import { CurrencyInput } from '../../src/currencyInput'
import { fireEvent } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

describe('Currency Input', () => {
  let el: HTMLInputElement, currencyInput: CurrencyInput
  beforeEach(() => {
    document.body.innerHTML = `<input type="text">`
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

    describe('caret position', () => {
      it('should retain the caret position if the last number before whitespace thousands separator is deleted', () => {
        currencyInput.setValue(1500000)
        currencyInput.setOptions({ currency: 'SEK', locale: 'sv-SV', hideGroupingSeparatorOnFocus: false })

        expect(el.value).toBe('1 500 000 kr')
        el.setSelectionRange(0, 1)

        userEvent.type(el, '{del}')

        expect(el.value).toBe('500 000')
        expect(el.selectionStart).toBe(0)
      })
    })
  })
})
