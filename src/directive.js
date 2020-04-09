import Vue from 'vue'
import { DEFAULT_OPTIONS } from './api'
import { getCaretPositionAfterFormat, getDistractionFreeCaretPosition, setCaretPosition } from './utils/caretPosition'
import conformToMask from './utils/conformToMask'
import createCurrencyFormat from './utils/createCurrencyFormat'
import dispatchEvent from './utils/dispatchEvent'
import equal from './utils/equal'
import { toFloat, toInteger } from './utils/numberUtils'
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
  const currencyFormat = createCurrencyFormat(options)
  inputElement.$ci = {
    ...inputElement.$ci || {},
    options,
    currencyFormat
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
    dispatchEvent(el, 'change', { numberValue: toInteger(el.$ci.numberValue, valueAsInteger, maximumFractionDigits) })
  }
}

const updateInputValue = (el, value, hideNegligibleDecimalDigits) => {
  if (value != null) {
    const { focus, options: { allowNegative, autoDecimalMode, distractionFree, locale }, currencyFormat, previousConformedValue } = el.$ci
    const hideCurrencySymbol = focus && distractionFree.hideCurrencySymbol
    const { conformedValue, fractionDigits } = conformToMask(value, currencyFormat, previousConformedValue, hideCurrencySymbol, autoDecimalMode, allowNegative)
    if (typeof conformedValue === 'number') {
      let { maximumFractionDigits, minimumFractionDigits } = currencyFormat
      if (focus) {
        minimumFractionDigits = maximumFractionDigits
      }
      minimumFractionDigits = hideNegligibleDecimalDigits
        ? fractionDigits.replace(/0+$/, '').length
        : Math.min(minimumFractionDigits, fractionDigits.length)
      const formattedValue = new Intl.NumberFormat(locale, {
        useGrouping: !(focus && distractionFree.hideGroupingSymbol),
        minimumFractionDigits,
        maximumFractionDigits
      }).format(Math.abs(conformedValue))
      const isNegativeZero = conformedValue === 0 && (1 / conformedValue < 0)
      el.value = insertCurrencySymbol(formattedValue, currencyFormat, isNegativeZero || conformedValue < 0, hideCurrencySymbol)
      el.$ci.numberValue = conformedValue
    } else {
      el.value = conformedValue
      el.$ci.numberValue = parse(el.value, currencyFormat)
    }
  } else {
    el.value = el.$ci.numberValue = null
  }
  el.$ci.previousConformedValue = el.value
}

const format = (el, value, hideNegligibleDecimalDigits = false) => {
  updateInputValue(el, value, hideNegligibleDecimalDigits)
  let { numberValue, currencyFormat, options } = el.$ci
  numberValue = toInteger(numberValue, options.valueAsInteger, currencyFormat.maximumFractionDigits)
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
    const value = toFloat(e.detail.value, options.valueAsInteger, currencyFormat.maximumFractionDigits)
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
    Vue.nextTick(() => {
      const { value, $ci: { currencyFormat, options } } = inputElement
      if (value) {
        applyFixedFractionFormat(inputElement, toFloat(parse(value, currencyFormat), options.valueAsInteger, currencyFormat.maximumFractionDigits))
      }
    })
    addEventListener(inputElement)
  },
  componentUpdated (el, { value, oldValue }, { context }) {
    if (!equal(value, oldValue)) {
      const inputElement = init(el, value, context)
      applyFixedFractionFormat(inputElement, inputElement.$ci.numberValue, value.valueAsInteger !== oldValue.valueAsInteger)
    }
  }
}
