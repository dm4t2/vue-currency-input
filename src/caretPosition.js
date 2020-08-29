import { count } from './utils/stringUtils'

export const getCaretPositionAfterFormat = (newValue, inputtedValue, caretPosition, numberFormat, options) => {
  const { prefix, suffix, decimalSymbol, maximumFractionDigits, groupingSymbol } = numberFormat
  const decimalSymbolPosition = inputtedValue.indexOf(decimalSymbol) + 1
  let caretPositionFromLeft = inputtedValue.length - caretPosition

  if (Math.abs(newValue.length - inputtedValue.length) > 1 && caretPosition <= decimalSymbolPosition) {
    return newValue.indexOf(decimalSymbol) + 1
  } else if (newValue.substr(caretPosition, 1) === groupingSymbol && count(newValue, groupingSymbol) === count(inputtedValue, groupingSymbol) + 1) {
    return newValue.length - caretPositionFromLeft - 1
  } else {
    if (!options.autoDecimalMode && decimalSymbolPosition !== 0 && caretPosition > decimalSymbolPosition) {
      if (numberFormat.onlyDigits(inputtedValue.substr(decimalSymbolPosition)).length - 1 === maximumFractionDigits) {
        caretPositionFromLeft -= 1
      }
    }
    return options.distractionFree.hideCurrencySymbol
      ? newValue.length - caretPositionFromLeft
      : Math.max(newValue.length - Math.max(caretPositionFromLeft, suffix.length), prefix.length === 0 ? 0 : prefix.length + 1)
  }
}

export const getDistractionFreeCaretPosition = (numberFormat, options, value, caretPosition) => {
  let result = caretPosition
  if (options.distractionFree.hideCurrencySymbol) {
    result -= numberFormat.prefix.length
  }
  if (options.distractionFree.hideGroupingSymbol) {
    result -= count(value.substring(0, caretPosition), numberFormat.groupingSymbol)
  }
  return Math.max(0, result)
}
