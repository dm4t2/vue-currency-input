// @vitest-environment jsdom
import { CurrencyInput } from '../../src/currencyInput'
import { fireEvent } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { CurrencyDisplay, CurrencyInputOptions, ValueScaling } from '../../src'
import { describe, expect, it, beforeEach, vi } from 'vitest'

describe('Currency Input', () => {
  let el: HTMLInputElement, currencyInput: CurrencyInput, options: CurrencyInputOptions

  beforeEach(() => {
    document.body.innerHTML = `<input type="text">`
    el = document.querySelector('input') as HTMLInputElement
    options = {
      locale: 'en',
      currency: 'EUR'
    }
    currencyInput = new CurrencyInput({
      el,
      options,
      onInput: vi.fn(),
      onChange: vi.fn()
    })
  })

  describe('init', () => {
    it('should preserve an existing "inputmode" attribute on the input element', () => {
      document.body.innerHTML = `<input type="text" inputmode="text">`
      el = document.querySelector('input') as HTMLInputElement
      options = {
        locale: 'en',
        currency: 'EUR',
        autoDecimalDigits: true
      }
      currencyInput = new CurrencyInput({
        el,
        options,
        onInput: vi.fn(),
        onChange: vi.fn()
      })
      expect(el.getAttribute('inputmode')).toBe('text')
    })
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
      vi.useFakeTimers()
    })

    it('should update the input value', () => {
      currencyInput.setValue(12345.6)
      expect(el.value).toBe('€12,345.60')
      userEvent.click(el)
      vi.runOnlyPendingTimers()
      expect(el.value).toBe('12345.6')
    })

    describe('caret position', () => {
      const expectCaretPosition = (given: number, expected: number) => {
        el.setSelectionRange(given, given)
        userEvent.click(el)
        vi.runOnlyPendingTimers()

        expect(el.selectionStart).toBe(expected)
      }

      it('should not modify the caret position for empty values', () => {
        currencyInput.setValue(null)
        currencyInput.setOptions({ locale: 'en', currency: 'EUR' })
        expectCaretPosition(0, 0)
      })

      describe('hideCurrencySymbolOnFocus is true', () => {
        /**
         * -€1|,234 -> -1|234
         */
        it('should consider the sign for the new caret position', () => {
          currencyInput.setValue(-1234)
          currencyInput.setOptions({ locale: 'en', currency: 'EUR', hideCurrencySymbolOnFocus: true })
          expectCaretPosition(3, 2)
        })

        /**
         * 1|,234 -> 1|234
         */
        it('should not modify the caret position if currencyDisplay is hidden', () => {
          currencyInput.setValue(1234)
          currencyInput.setOptions({ locale: 'en', currency: 'EUR', hideCurrencySymbolOnFocus: true, currencyDisplay: CurrencyDisplay.hidden })
          expectCaretPosition(1, 1)
        })

        /**
         * |-€1 -> -|1
         */
        it('should set the caret position in front of the first digit when targeting the sign', () => {
          currencyInput.setValue(-1)
          currencyInput.setOptions({ locale: 'en', currency: 'EUR', hideCurrencySymbolOnFocus: true })
          expectCaretPosition(0, 1)
        })

        /**
         * -|€1 -> -|1
         */
        it('should set the caret position in front of the first digit when targeting the currency', () => {
          currencyInput.setValue(-1)
          currencyInput.setOptions({ locale: 'en', currency: 'EUR', hideCurrencySymbolOnFocus: true })
          expectCaretPosition(1, 1)
        })

        /**
         * (€ 5)| -> (5|)
         */
        it('should set the caret position after the last digit number when targeting the closing parentheses of the accounting sign', () => {
          currencyInput.setValue(-5)
          currencyInput.setOptions({ locale: 'nl', currency: 'EUR', hideCurrencySymbolOnFocus: true, accountingSign: true })
          expectCaretPosition(el.value.length, 2)
        })
      })

      describe('hideCurrencySymbolOnFocus is false', () => {
        /**
         * |€1,234 -> €|1234
         */
        it('should set the caret position in front of the first number when targeting the prefix', () => {
          currencyInput.setValue(1234)
          currencyInput.setOptions({ locale: 'en', currency: 'EUR', hideCurrencySymbolOnFocus: false })
          expectCaretPosition(0, 1)
        })

        /**
         * 1.234 €| -> 1234| €
         */
        it('should set the caret position after the last number when targeting the suffix', () => {
          currencyInput.setValue(1234)
          currencyInput.setOptions({ locale: 'de', currency: 'EUR', hideCurrencySymbolOnFocus: false })
          expectCaretPosition(el.value.length, 4)
        })
      })

      describe('currencyDisplay is hidden', () => {
        /**
         * (1)| -> (1|)
         */
        it('should set the caret position after the last digit number when targeting the closing parentheses of the accounting sign', () => {
          currencyInput.setValue(-1)
          currencyInput.setOptions({ locale: 'en', currency: 'EUR', currencyDisplay: CurrencyDisplay.hidden, accountingSign: true })
          expectCaretPosition(el.value.length, 2)
        })

        /**
         * 1,234| -> 1234|
         */
        it('should ignore the prefix for the new caret position', () => {
          currencyInput.setValue(1234)
          currencyInput.setOptions({ locale: 'en', currency: 'EUR', currencyDisplay: CurrencyDisplay.hidden })
          expectCaretPosition(el.value.length, 4)
        })
      })
    })
  })
})
