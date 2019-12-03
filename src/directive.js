import Vue from 'vue'
import defaultOptions from './defaultOptions'
import { getCaretPositionAfterFormat, getDistractionFreeCaretPosition, setCaretPosition } from './utils/caretPosition'
import conformToMask from './utils/conformToMask'
import createCurrencyFormat from './utils/createCurrencyFormat'
import dispatchEvent from './utils/dispatchEvent'
import parse from './utils/parse'
import equal from './utils/equal'
import { toFloat, toInteger } from './utils/numberUtils'

const init = (el, optionsFromBinding, { inputEvent }, { $CI_DEFAULT_OPTIONS }) => {
  const inputElement = el.tagName.toLowerCase() === 'input' ? el : el.querySelector('input')
  if (!inputElement) {
    throw new Error('No input element found')
  }
  const options = { ...($CI_DEFAULT_OPTIONS || defaultOptions), ...optionsFromBinding }
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
    inputEvent,
    currencyFormat
  }
  return inputElement
}

const applyFixedFractionFormat = (el, value) => {
  const { options: { min, max, locale }, currencyFormat: { minimumFractionDigits, maximumFractionDigits } } = el.$ci
  if (value != null) {
    if (min != null && value < min) {
      value = min
    }
    if (max != null && value > max) {
      value = max
    }
    value = new Intl.NumberFormat(locale, { minimumFractionDigits, maximumFractionDigits }).format(value)
  }
  format(el, value)
  if (!el.$ci.inputEvent) {
    dispatchEvent(el, 'input')
  }
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
        minimumFractionDigits: hideNegligibleDecimalDigitsOnFocus(el) ? fractionDigits.replace(/0+$/, '').length : Math.min(formatConfig.minimumFractionDigits, fractionDigits.length),
        maximumFractionDigits: formatConfig.maximumFractionDigits
      }).format(Math.abs(conformedValue))
      const isNegativeZero = conformedValue === 0 && (1 / conformedValue < 0)
      el.value = `${isNegativeZero || conformedValue < 0 ? formatConfig.negativePrefix : formatConfig.prefix}${formattedValue}${formatConfig.suffix}`
      el.$ci.numberValue = conformedValue
    } else {
      el.value = conformedValue
      el.$ci.numberValue = parse(el.value, formatConfig, false)
    }
  } else {
    el.value = el.$ci.numberValue = null
  }
  el.$ci.previousConformedValue = el.value
}

const format = (el, value) => {
  updateInputValue(el, value)
  let { numberValue, currencyFormat, options, inputEvent } = el.$ci
  if (numberValue != null) {
    numberValue = toInteger(numberValue, options.valueAsInteger, currencyFormat.maximumFractionDigits)
  }
  if (inputEvent) {
    dispatchEvent(el, inputEvent, { numberValue })
  }
}

const addEventListener = (el) => {
  el.addEventListener('input', () => {
    const { value, selectionStart, $ci: { currencyFormat, options } } = el
    format(el, value)
    if (el.$ci.focus) {
      setCaretPosition(el, getCaretPositionAfterFormat(el.value, value, selectionStart, currencyFormat, options))
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
  bind (el, { value: options, modifiers }, { context }) {
    const inputElement = init(el, options, modifiers, context)
    Vue.nextTick(() => {
      const { value, $ci: { currencyFormat, options } } = inputElement
      if (value) {
        applyFixedFractionFormat(inputElement, toFloat(parse(value, currencyFormat), options.valueAsInteger, currencyFormat.maximumFractionDigits))
      }
    })
    addEventListener(inputElement)
  },
  componentUpdated (el, { value, oldValue, modifiers }, { context }) {
    if (!equal(value, oldValue)) {
      const inputElement = init(el, value, modifiers, context)
      applyFixedFractionFormat(inputElement, inputElement.$ci.numberValue)
    }
  }
}
