import { CurrencyInput } from '../../src/currencyInput'
import { fireEvent } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { CurrencyDisplay, CurrencyInputOptions, ValueScaling } from '../../src'

describe('Currency Input', () => {
  let el: HTMLInputElement, currencyInput: CurrencyInput, options: CurrencyInputOptions

  beforeEach(() => {
    document.body.innerHTML = `<input type="text">`
    el = document.querySelector('input') as HTMLInputElement
    options = {
      locale: 'en',
      currency: 'EUR'
    }
    currencyInput = new CurrencyInput(el, options)
  })

  describe('setValue', () => {
    it('should update the input value', () => {
      currencyInput.setValue(1)

      expect(el.value).toBe('€1')
    })

    it('should consider the value scaling', () => {
      currencyInput.setOptions({ ...options, valueScaling: ValueScaling.precision })
      currencyInput.setValue(1)
      expect(el.value).toBe('€0.01')

      currencyInput.setOptions({ ...options, valueScaling: ValueScaling.thousands })
      currencyInput.setValue(1234)
      expect(el.value).toBe('€1.23')
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

  describe('on focus', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    it('should update the input value', () => {
      currencyInput.setValue(12345.6)
      expect(el.value).toBe('€12,345.60')
      userEvent.click(el)
      jest.runOnlyPendingTimers()
      expect(el.value).toBe('12345.6')
    })

    describe('caret position', () => {
      it('should set the caret position in front of the first number when targeting the prefix', () => {
        currencyInput.setValue(1234)
        currencyInput.setOptions({ locale: 'en', currency: 'EUR', hideCurrencySymbolOnFocus: false })

        el.setSelectionRange(0, 0)
        userEvent.click(el)
        jest.runOnlyPendingTimers()

        expect(el.selectionStart).toBe(1)
      })

      it('should set the caret position after the last number when targeting the suffix', () => {
        currencyInput.setValue(1234)
        currencyInput.setOptions({ locale: 'de', currency: 'EUR', hideCurrencySymbolOnFocus: false })

        el.setSelectionRange(el.value.length, el.value.length)
        userEvent.click(el)
        jest.runOnlyPendingTimers()

        expect(el.selectionStart).toBe(4)
      })

      it('should ignore the prefix in the caret position calculation when the currency is hidden', () => {
        currencyInput.setValue(1234)
        currencyInput.setOptions({ locale: 'en', currency: 'EUR', currencyDisplay: CurrencyDisplay.hidden })

        el.setSelectionRange(el.value.length, el.value.length)
        userEvent.click(el)
        jest.runOnlyPendingTimers()

        expect(el.selectionStart).toBe(el.value.length)
      })
    })
  })
})
