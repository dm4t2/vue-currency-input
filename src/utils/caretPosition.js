import { count, onlyDigits, removeSuffix } from './formatHelper'

export const setCaretPosition = (el, position) => el.setSelectionRange(position, position)

export const getCaretPositionAfterFormat = (newValue, inputtedValue, caretPosition, currencyFormat, options) => {
  const { prefix, suffix, decimalSymbol, decimalLength, groupingSymbol } = currencyFormat
  const decimalSymbolPosition = inputtedValue.indexOf(decimalSymbol) + 1
  let caretPositionFromLeft = inputtedValue.length - caretPosition

  if (Math.abs(newValue.length - inputtedValue.length) > 1 && caretPosition <= decimalSymbolPosition) {
    return newValue.indexOf(decimalSymbol) + 1
  } else if (newValue.substr(caretPosition, 1) === groupingSymbol && count(newValue, groupingSymbol) === count(inputtedValue, groupingSymbol) + 1) {
    return newValue.length - caretPositionFromLeft - 1
  } else {
    if (!options.autoDecimalMode && decimalSymbolPosition !== 0 && caretPosition > decimalSymbolPosition) {
      if (onlyDigits(removeSuffix(inputtedValue.substr(decimalSymbolPosition), suffix)).length - 1 === decimalLength) {
        caretPositionFromLeft -= 1
      }
    }
    return options.distractionFree.hideCurrencySymbol
      ? newValue.length - caretPositionFromLeft
      : Math.max(newValue.length - Math.max(caretPositionFromLeft, suffix.length), prefix.length === 0 ? 0 : prefix.length + 1)
  }
}

export const getDistractionFreeCaretPosition = (formatConfig, options, value, caretPosition) => {
  let result = caretPosition
  if (options.distractionFree.hideCurrencySymbol) {
    result -= formatConfig.prefix.length
  }
  if (options.distractionFree.hideGroupingSymbol) {
    result -= count(value.substring(0, caretPosition), formatConfig.groupingSymbol)
  }
  return Math.max(0, result)
}
