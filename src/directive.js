import { DEFAULT_OPTIONS } from './api'
import { getCaretPositionAfterFormat, getDistractionFreeCaretPosition, setCaretPosition } from './utils/caretPosition'
import conformToMask from './utils/conformToMask'
import createCurrencyFormat from './utils/createCurrencyFormat'
import dispatchEvent from './utils/dispatchEvent'
import equal from './utils/equal'
import { toInternalNumberModel, toExternalNumberModel } from './utils/numberUtils'
import parse from './utils/parse'
import { insertCurrencySymbol } from './utils/stringUtils'

const init = (el, optionsFromBinding, { $CI_DEFAULT_OPTIONS }) => {
  const inputElement = el.tagName.toLowerCase() === 'input' ? el : el.querySelector('input')
  if (!inputElement) {
    throw new Error('No input element found')
  }
  const options = { ...($CI_DEFAULT_OPTIONS || DEFAULT_OPTIONS), ...optionsFromBinding }
  const { distractionFree, autoDecimalMode } = options
  if (typeof distractionFree === 'boolean') {
    options.distractionFree = {
      hideCurrencySymbol: distractionFree,
      hideNegligibleDecimalDigits: distractionFree,
      hideGroupingSymbol: distractionFree
    }
  }
  if (autoDecimalMode) {
    options.distractionFree.hideNegligibleDecimalDigits = false
    inputElement.setAttribute('inputmode', 'numeric')
  } else {
    inputElement.setAttribute('inputmode', 'decimal')
  }
  inputElement.$ci = {
    ...inputElement.$ci || {},
    options,
    currencyFormat: createCurrencyFormat(options),
    decimalFormat: createCurrencyFormat({ ...options, currency: null })
  }
  return inputElement
}

const validateValueRange = (value, valueRange) => {
  if (valueRange) {
    const { min, max } = valueRange
    if (min !== undefined && value < min) {
      value = min
    }
    if (max !== undefined && value > max) {
      value = max
    }
  }
  return value
}

const applyFixedFractionFormat = (el, value, forcedChange) => {
  const { valueRange, locale, valueAsInteger } = el.$ci.options
  const { maximumFractionDigits, minimumFractionDigits } = el.$ci.currencyFormat
  if (value != null) {
    value = validateValueRange(value, valueRange)
    value = new Intl.NumberFormat(locale, { minimumFractionDigits, maximumFractionDigits }).format(value)
  }
  format(el, value)
  if (forcedChange) {
    dispatchEvent(el, 'change', { numberValue: toExternalNumberModel(el.$ci.numberValue, valueAsInteger, maximumFractionDigits) })
  }
}

const updateInputValue = (el, value, hideNegligibleDecimalDigits) => {
  if (value != null) {
    const { focus, options, currencyFormat, decimalFormat, previousConformedValue } = el.$ci
    const { allowNegative, autoDecimalMode, distractionFree, locale } = options
    const format = focus && distractionFree.hideCurrencySymbol ? decimalFormat : currencyFormat
    const conformedValue = conformToMask(value, format, previousConformedValue, autoDecimalMode, allowNegative)
    if (typeof conformedValue === 'object') {
      const { numberValue, fractionDigits } = conformedValue
      let { maximumFractionDigits, minimumFractionDigits } = format
      if (focus) {
        minimumFractionDigits = maximumFractionDigits
      }
      minimumFractionDigits = hideNegligibleDecimalDigits
        ? fractionDigits.replace(/0+$/, '').length
        : Math.min(minimumFractionDigits, fractionDigits.length)
      const formattedValue = Math.abs(numberValue).toLocaleString(locale, {
        useGrouping: !(focus && distractionFree.hideGroupingSymbol),
        minimumFractionDigits,
        maximumFractionDigits
      })
      const isNegativeZero = numberValue === 0 && (1 / numberValue < 0)
      el.value = insertCurrencySymbol(formattedValue, format, isNegativeZero || numberValue < 0)
      el.$ci.numberValue = numberValue
    } else {
      el.value = conformedValue
      el.$ci.numberValue = parse(el.value, format)
    }
  } else {
    el.value = el.$ci.numberValue = null
  }
  el.$ci.previousConformedValue = el.value
}

const format = (el, value, hideNegligibleDecimalDigits = false) => {
  updateInputValue(el, value, hideNegligibleDecimalDigits)
  let { numberValue, currencyFormat, options } = el.$ci
  numberValue = toExternalNumberModel(numberValue, options.valueAsInteger, currencyFormat.maximumFractionDigits)
  dispatchEvent(el, 'input', { numberValue })
}

const addEventListener = (el) => {
  el.addEventListener('input', (e) => {
    if (!e.detail) {
      const { value, selectionStart, $ci: { currencyFormat, options } } = el
      format(el, value)
      if (el.$ci.focus) {
        setCaretPosition(el, getCaretPositionAfterFormat(el.value, value, selectionStart, currencyFormat, options))
      }
    }
  }, { capture: true })

  el.addEventListener('format', (e) => {
    const { currencyFormat, options, numberValue } = el.$ci
    const value = toInternalNumberModel(e.detail.value, options.valueAsInteger, currencyFormat.maximumFractionDigits)
    if (value !== numberValue) {
      applyFixedFractionFormat(el, value)
    }
  })

  el.addEventListener('focus', () => {
    el.$ci.oldValue = el.$ci.numberValue
    el.$ci.focus = true
    const { hideCurrencySymbol, hideGroupingSymbol, hideNegligibleDecimalDigits } = el.$ci.options.distractionFree
    if (hideCurrencySymbol || hideGroupingSymbol || hideNegligibleDecimalDigits) {
      setTimeout(() => {
        const { value, selectionStart, selectionEnd } = el
        format(el, el.value, hideNegligibleDecimalDigits)
        if (Math.abs(selectionStart - selectionEnd) > 0) {
          el.setSelectionRange(0, el.value.length)
        } else {
          setCaretPosition(el, getDistractionFreeCaretPosition(el.$ci.currencyFormat, el.$ci.options, value, selectionStart))
        }
      })
    }
  })

  el.addEventListener('blur', () => {
    el.$ci.focus = false
    applyFixedFractionFormat(el, el.$ci.numberValue, el.$ci.oldValue !== el.$ci.numberValue)
  })
}

export default {
  bind (el, { value: options }, { context }) {
    const inputElement = init(el, options, context)
    const { value, $ci: { currencyFormat } } = inputElement
    if (value) {
      applyFixedFractionFormat(inputElement, toInternalNumberModel(parse(value, currencyFormat), options.valueAsInteger, currencyFormat.maximumFractionDigits))
    }
    addEventListener(inputElement)
  },
  componentUpdated (el, { value, oldValue }, { context }) {
    if (!equal(value, oldValue)) {
      const inputElement = init(el, value, context)
      applyFixedFractionFormat(inputElement, inputElement.$ci.numberValue, value.valueAsInteger !== oldValue.valueAsInteger)
    }
  }
}
