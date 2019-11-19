import Vue from 'vue'
import defaultOptions from './defaultOptions'
import { getCaretPositionAfterFormat, getDistractionFreeCaretPosition, setCaretPosition } from './utils/caretPosition'
import conformToMask from './utils/conformToMask'
import createCurrencyFormat from './utils/createCurrencyFormat'
import dispatchEvent from './utils/dispatchEvent'
import parse, { getNumber } from './utils/parse'

const init = (el, optionsFromBinding, defaultOptions) => {
  const inputElement = el.tagName.toLowerCase() === 'input' ? el : el.querySelector('input')
  if (!inputElement) {
    throw new Error('No input element found')
  }
  const options = { ...defaultOptions, ...optionsFromBinding }
  const { min, max, distractionFree, autoDecimalMode } = options
  if (typeof distractionFree === 'boolean') {
    options.distractionFree = {
      hideCurrencySymbol: distractionFree,
      hideNegligibleDecimalDigits: distractionFree,
      hideGroupingSymbol: distractionFree
    }
  }
  if (autoDecimalMode) {
    options.distractionFree.hideNegligibleDecimalDigits = false
  }
  if (min != null && max != null && min > max) {
    throw new Error('Invalid value range')
  }
  const currencyFormat = createCurrencyFormat(options)
  inputElement.$ci = {
    ...inputElement.$ci || {},
    options,
    currencyFormat
  }
  return inputElement
}

const applyFixedFractionFormat = (el, value) => {
  const { options: { min, max, locale }, currencyFormat: { decimalLength } } = el.$ci
  if (value != null) {
    if (min != null && value < min) {
      value = min
    }
    if (max != null && value > max) {
      value = max
    }
    value = new Intl.NumberFormat(locale, { minimumFractionDigits: decimalLength, maximumFractionDigits: decimalLength }).format(value)
  }
  format(el, value)
}

const hideCurrencySymbolOnFocus = el => el.$ci.focus && el.$ci.options.distractionFree.hideCurrencySymbol

const hideGroupingSymbolOnFocus = el => el.$ci.focus && el.$ci.options.distractionFree.hideGroupingSymbol

const hideNegligibleDecimalDigitsOnFocus = el => el.$ci.focus && el.$ci.options.distractionFree.hideNegligibleDecimalDigits

const updateInputValue = (el, value) => {
  if (value != null) {
    const { options, currencyFormat, previousConformedValue } = el.$ci
    const formatConfig = { ...currencyFormat }
    if (hideCurrencySymbolOnFocus(el)) {
      formatConfig.prefix = ''
      formatConfig.negativePrefix = '-'
      formatConfig.suffix = ''
    }
    const { conformedValue, fractionDigits } = conformToMask(value, formatConfig, options, previousConformedValue)
    if (typeof conformedValue === 'number') {
      const formattedValue = new Intl.NumberFormat(options.locale, {
        useGrouping: !hideGroupingSymbolOnFocus(el),
        minimumFractionDigits: hideNegligibleDecimalDigitsOnFocus(el) ? fractionDigits.replace(/0+$/, '').length : Math.min(formatConfig.decimalLength, fractionDigits.length)
      }).format(Math.abs(conformedValue))
      const isNegativeZero = conformedValue === 0 && (1 / conformedValue < 0)
      el.value = `${isNegativeZero || conformedValue < 0 ? formatConfig.negativePrefix : formatConfig.prefix}${formattedValue}${formatConfig.suffix}`
      el.$ci.numberValue = conformedValue
    } else {
      el.value = conformedValue
      el.$ci.numberValue = parse(el.value, formatConfig, options.valueAsInteger)
    }
  } else {
    el.value = el.$ci.numberValue = null
  }
  el.$ci.previousConformedValue = el.value
}

const format = (el, value) => {
  updateInputValue(el, value)
  const numberValue = getNumber(el.$ci.numberValue, el.$ci.options.valueAsInteger, el.$ci.currencyFormat.decimalLength)
  dispatchEvent(el, 'format-complete', { numberValue })
}

const toFloat = (number, options, currencyFormat) => {
  if (options.valueAsInteger) {
    return number / Math.pow(10, currencyFormat.decimalLength)
  }
  return number
}

const addEventListener = (el) => {
  el.addEventListener('input', () => {
    const { value, selectionStart, $ci: { currencyFormat, options } } = el
    format(el, value)
    if (el.$ci.focus) {
      setCaretPosition(el, getCaretPositionAfterFormat(el.value, value, selectionStart, currencyFormat, options))
    }
  }, { capture: true })

  el.addEventListener('format', ({ detail }) => {
    const { focus, currencyFormat, options } = el.$ci
    if (!focus) {
      applyFixedFractionFormat(el, toFloat(detail.value, options, currencyFormat))
    }
  })

  el.addEventListener('focus', () => {
    el.$ci.focus = true
    if (hideCurrencySymbolOnFocus(el) || hideGroupingSymbolOnFocus(el) || hideNegligibleDecimalDigitsOnFocus(el)) {
      setTimeout(() => {
        const { value, selectionStart, selectionEnd } = el
        updateInputValue(el, el.value)
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
    applyFixedFractionFormat(el, el.$ci.numberValue)
  })
}

export default {
  bind (el, { value: options }, { context }) {
    const inputElement = init(el, options, context.$CI_DEFAULT_OPTIONS || defaultOptions)
    Vue.nextTick(() => {
      const { value, $ci: { currencyFormat, options } } = inputElement
      if (value) {
        applyFixedFractionFormat(inputElement, toFloat(parse(value, currencyFormat), options, currencyFormat))
      }
    })
    addEventListener(inputElement)
  },
  componentUpdated (el, { value, oldValue }, { context }) {
    if (!!value && Object.keys(defaultOptions).some((key) => oldValue[key] !== value[key])) {
      const inputElement = init(el, value, context.$CI_DEFAULT_OPTIONS || defaultOptions)
      applyFixedFractionFormat(inputElement, inputElement.$ci.numberValue)
    }
  }
}
