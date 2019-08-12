import { getCaretPositionAfterFormat, getCaretPositionOnFocus } from '../../src/utils/caretPosition'

const currencyFormat = {
  decimalSymbol: '.',
  thousandsSeparatorSymbol: ',',
  decimalLength: 2,
  prefix: '$',
  suffix: ''
}

describe('caretPosition', () => {
  describe('getCaretPositionAfterFormat', () => {
    describe('the decimal symbol position moves to the left', () => {
      /**
       * Original value:  12|3456.78
       * Modified value:  12.|3456.78
       * New value:       12.|34
       */
      it('returns the position after the new decimal position', () => {
        const el = { value: '12.34', $ci: { currencyFormat } }
        expect(getCaretPositionAfterFormat(el, '12.3456.78', 3)).toBe(3)
      })
    })

    describe('a thousands separator symbol has been deleted', () => {
      /**
       * Original value:  1,|234
       * Modified value:  1|234
       * New value:       1|,234
       */
      it('returns the position before the thousands separator', () => {
        const el = { value: '1,234', $ci: { currencyFormat } }
        expect(getCaretPositionAfterFormat(el, '1234', 1)).toBe(1)
      })
    })

    describe('the currency symbol is hidden', () => {
      describe('the value contains no decimal symbol', () => {
        /**
         * Original value:  123|
         * Modified value:  1234|
         * New value:       1,234|
         */
        it('returns the expected caret position', () => {
          const el = { value: '1,234', $ci: { currencyFormat, options: { hideCurrencySymbol: true } } }
          expect(getCaretPositionAfterFormat(el, '1234', 4)).toBe(5)
        })
      })

      describe('the value contains a decimal symbol', () => {
        /**
         * Original value:  123|.99
         * Modified value:  1234|.99
         * New value:       1,234|.99
         */
        it('returns the expected caret position if the integer part is modified', () => {
          const el = { value: '1,234.99', $ci: { currencyFormat, options: { hideCurrencySymbol: true } } }
          expect(getCaretPositionAfterFormat(el, '1234.99', 4)).toBe(5)
        })

        /**
         * Original value:  1.|99
         * Modified value:  1.0|99
         * New value:       1.0|9
         */
        it('returns the expected caret position if the fraction part is modified', () => {
          const el = { value: '1.09', $ci: { currencyFormat, options: { hideCurrencySymbol: true } } }
          expect(getCaretPositionAfterFormat(el, '1.099', 3)).toBe(3)
        })

        /**
         * Original value:  1.|9
         * Modified value:  1.0|9
         * New value:       1.0|9
         */
        it('returns the expected caret position if the fraction part is extended', () => {
          const el = { value: '1.09', $ci: { currencyFormat, options: { hideCurrencySymbol: true } } }
          expect(getCaretPositionAfterFormat(el, '1.09', 3)).toBe(3)
        })
      })
    })

    describe('the currency symbol is visible', () => {
      describe('the currency symbol is prefixed', () => {
        /**
         * Original value:  |
         * Modified value:  1|
         * New value:       $1|
         */
        it('returns the expected caret position if new value is entered', () => {
          const el = { value: '$1', $ci: { currencyFormat, options: { hideCurrencySymbol: false } } }
          expect(getCaretPositionAfterFormat(el, '1', 1)).toBe(2)
        })
      })

      describe('the currency symbol is suffixed', () => {
        /**
         * Original value:  |
         * Modified value:  1|
         * New value:       1| $
         */
        it('returns the expected caret position if new value is entered', () => {
          const el = {
            value: '1 $',
            $ci: {
              currencyFormat: {
                ...currencyFormat,
                prefix: '',
                suffix: ' $'
              },
              options: { hideCurrencySymbol: false }
            }
          }

          expect(getCaretPositionAfterFormat(el, '1', 1)).toBe(1)
        })
      })
    })
  })

  describe('getCaretPositionOnFocus', () => {
    describe('only the currency symbol is hidden on focus', () => {
      /**
       * Original value:  $1,234,|768
       * New value:       1,234,|768
       */
      it('returns the caret position subtracted by the prefix length', () => {
        expect(getCaretPositionOnFocus({
          value: '$1,234,768',
          selectionStart: 7,
          $ci: {
            currencyFormat,
            options: { hideCurrencySymbol: true, hideThousandsSeparatorSymbol: false }
          }
        })).toBe(6)
      })
    })

    describe('only the thousands separator symbol is hidden on focus', () => {
      /**
       * Original value:  $1|,234,768
       * New value:       $1|234768
       */
      it('returns the current caret position if before the first thousands separator symbol', () => {
        expect(getCaretPositionOnFocus({
          value: '$1,234,768',
          selectionStart: 2,
          $ci: {
            currencyFormat,
            options: { hideCurrencySymbol: false, hideThousandsSeparatorSymbol: true }
          }
        })).toBe(2)
      })

      /**
       * Original value:  $1,234,|768
       * New value:       $1234|768
       */
      it('returns the caret position subtracted by the respective number of thousands separator symbols', () => {
        expect(getCaretPositionOnFocus({
          value: '$1,234,768',
          selectionStart: 7,
          $ci: {
            currencyFormat,
            options: { hideCurrencySymbol: false, hideThousandsSeparatorSymbol: true }
          }
        })).toBe(5)
      })
    })

    describe('the currency symbol and thousands separator symbol are both visible on focus', () => {
      /**
       * Original value:  $1,234,|768
       * New value:       $1,234,|768
       */
      it('returns the expected caret position', () => {
        expect(getCaretPositionOnFocus({
          value: '$1,234,768',
          selectionStart: 7,
          $ci: {
            currencyFormat,
            options: { hideCurrencySymbol: false, hideThousandsSeparatorSymbol: false }
          }
        })).toBe(7)
      })
    })

    describe('the currency symbol and thousands separator symbol are both hidden on focus', () => {
      /**
       * Original value:  $1,2|34,768
       * New value:       12|34768
       */
      it('returns the expected caret position', () => {
        expect(getCaretPositionOnFocus({
          value: '$1,234,768',
          selectionStart: 4,
          $ci: {
            currencyFormat,
            options: { hideCurrencySymbol: true, hideThousandsSeparatorSymbol: true }
          }
        })).toBe(2)
      })
    })
  })
})
