import { count, onlyDigits, removeSuffix } from './formatHelper'

export const setCaretPosition = (el, position) => el.setSelectionRange(position, position)

export const getCaretPositionAfterFormat = (el, inputtedValue, caretPosition) => {
  const { prefix, suffix, decimalSymbol, decimalLength, groupingSymbol } = el.$ci.currencyFormat
  const newValue = el.value
  const decimalSymbolPosition = inputtedValue.indexOf(decimalSymbol) + 1
  let caretPositionFromLeft = inputtedValue.length - caretPosition

  if (Math.abs(newValue.length - inputtedValue.length) > 1 && caretPosition <= decimalSymbolPosition) {
    return newValue.indexOf(decimalSymbol) + 1
  } else if (newValue.substr(caretPosition, 1) === groupingSymbol && count(newValue, groupingSymbol) === count(inputtedValue, groupingSymbol) + 1) {
    return newValue.length - caretPositionFromLeft - 1
  } else {
    if (!el.$ci.options.autoDecimalMode && decimalSymbolPosition !== 0 && caretPosition > decimalSymbolPosition) {
      if (onlyDigits(removeSuffix(inputtedValue.substr(decimalSymbolPosition), suffix)).length - 1 === decimalLength) {
        caretPositionFromLeft -= 1
      }
    }
    return el.$ci.options.hideCurrencySymbol
      ? newValue.length - caretPositionFromLeft
      : Math.max(newValue.length - Math.max(caretPositionFromLeft, suffix.length), prefix.length === 0 ? 0 : prefix.length + 1)
  }
}

export const getCaretPositionAfterApplyingDistractionFreeFormat = ({ prefix, groupingSymbol }, { hideCurrencySymbol, hideGroupingSymbol }, value, caretPosition) => {
  let result = caretPosition
  if (hideCurrencySymbol) {
    result -= prefix.length
  }
  if (hideGroupingSymbol) {
    result -= count(value.substring(0, caretPosition), groupingSymbol)
  }
  return Math.max(0, result)
}
