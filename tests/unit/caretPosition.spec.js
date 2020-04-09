import { getCaretPositionAfterFormat, getDistractionFreeCaretPosition } from '../../src/utils/caretPosition'

const currencyFormat = {
  decimalSymbol: '.',
  groupingSymbol: ',',
  maximumFractionDigits: 2,
  prefix: '$',
  suffix: '',
  digits: []
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
        expect(getCaretPositionAfterFormat('12.34', '12.3456.78', 3, currencyFormat)).toBe(3)
      })
    })

    describe('a grouping symbol has been deleted', () => {
      /**
       * Original value:  1,|234
       * Modified value:  1|234
       * New value:       1|,234
       */
      it('returns the position before the grouping symbol', () => {
        expect(getCaretPositionAfterFormat('1,234', '1234', 1, currencyFormat)).toBe(1)
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
          expect(getCaretPositionAfterFormat('1,234', '1234', 4, currencyFormat, { distractionFree: { hideCurrencySymbol: true } })).toBe(5)
        })
      })

      describe('the value contains a decimal symbol', () => {
        /**
         * Original value:  123|.99
         * Modified value:  1234|.99
         * New value:       1,234|.99
         */
        it('returns the expected caret position if the integer part is modified', () => {
          expect(getCaretPositionAfterFormat('1,234.99', '1234.99', 4, currencyFormat, { distractionFree: { hideCurrencySymbol: true } })).toBe(5)
        })

        /**
         * Original value:  1.|99
         * Modified value:  1.0|99
         * New value:       1.0|9
         */
        it('returns the expected caret position if the fraction part is modified', () => {
          expect(getCaretPositionAfterFormat('1.09', '1.099', 3, currencyFormat, { distractionFree: { hideCurrencySymbol: true } })).toBe(3)
        })

        /**
         * Original value:  1.|9
         * Modified value:  1.0|9
         * New value:       1.0|9
         */
        it('returns the expected caret position if the fraction part is extended', () => {
          expect(getCaretPositionAfterFormat('1.09', '1.09', 3, currencyFormat, { distractionFree: { hideCurrencySymbol: true } })).toBe(3)
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
          expect(getCaretPositionAfterFormat('$1', '1', 1, currencyFormat, { distractionFree: { hideCurrencySymbol: false } })).toBe(2)
        })
      })

      describe('the currency symbol is suffixed', () => {
        /**
         * Original value:  |
         * Modified value:  1|
         * New value:       1| $
         */
        it('returns the expected caret position if new value is entered', () => {
          expect(getCaretPositionAfterFormat('1 $', '1', 1, { ...currencyFormat, prefix: '', suffix: ' $' }, { distractionFree: { hideCurrencySymbol: false } })).toBe(1)
        })
      })
    })
  })

  describe('getDistractionFreeCaretPosition', () => {
    describe('only the currency symbol is hidden on focus', () => {
      /**
       * Original value:  $1,234,|768
       * New value:       1,234,|768
       */
      it('returns the caret position subtracted by the prefix length', () => {
        expect(getDistractionFreeCaretPosition(currencyFormat, { distractionFree: { hideCurrencySymbol: true, hideGroupingSymbol: false } }, '$1,234,768', 7)).toBe(6)
      })
    })

    describe('only the grouping symbol is hidden on focus', () => {
      /**
       * Original value:  $1|,234,768
       * New value:       $1|234768
       */
      it('returns the current caret position if before the first grouping symbol', () => {
        expect(getDistractionFreeCaretPosition(currencyFormat, { distractionFree: { hideCurrencySymbol: false, hideGroupingSymbol: true } }, '$1,234,768', 2)).toBe(2)
      })

      /**
       * Original value:  $1,234,|768
       * New value:       $1234|768
       */
      it('returns the caret position subtracted by the respective number of grouping symbols', () => {
        expect(getDistractionFreeCaretPosition(currencyFormat, { distractionFree: { hideCurrencySymbol: false, hideGroupingSymbol: true } }, '$1,234,768', 7)).toBe(5)
      })
    })

    describe('the currency symbol and grouping symbol are both visible on focus', () => {
      /**
       * Original value:  $1,234,|768
       * New value:       $1,234,|768
       */
      it('returns the expected caret position', () => {
        expect(getDistractionFreeCaretPosition(currencyFormat, { distractionFree: { hideCurrencySymbol: false, hideGroupingSymbol: false } }, '$1,234,768', 7)).toBe(7)
      })
    })

    describe('the currency symbol and grouping symbol are both hidden on focus', () => {
      /**
       * Original value:  $1,2|34,768
       * New value:       12|34768
       */
      it('returns the expected caret position', () => {
        expect(getDistractionFreeCaretPosition(currencyFormat, { distractionFree: { hideCurrencySymbol: true, hideGroupingSymbol: true } }, '$1,234,768', 4)).toBe(2)
      })
    })
  })
})
