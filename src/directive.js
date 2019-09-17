import Vue from 'vue'
import defaultOptions from './defaultOptions'
import { getCaretPositionAfterApplyingDistractionFreeFormat, getCaretPositionAfterFormat, setCaretPosition } from './utils/caretPosition'
import conformToMask from './utils/conformToMask'
import createCurrencyFormat from './utils/createCurrencyFormat'
import dispatchEvent from './utils/dispatchEvent'
import { parse } from './utils/formatHelper'

export default {
  bind (el, { value: options }, { context }) {
    const inputElement = init(el, options, context.$CI_DEFAULT_OPTIONS || defaultOptions)
    Vue.nextTick(() => {
      if (inputElement.value) {
        applyFixedFractionFormat(inputElement)
      }
    })

    inputElement.addEventListener('input', () => {
      if (inputElement.$ci.focus) {
        const { value, selectionStart } = inputElement
        format(inputElement)
        setCaretPosition(inputElement, getCaretPositionAfterFormat(inputElement, value, selectionStart))
      } else {
        format(inputElement)
      }
    }, { capture: true })

    inputElement.addEventListener('format', ({ detail }) => {
      if (!inputElement.$ci.focus) {
        applyFixedFractionFormat(inputElement, detail.value)
      }
    })

    inputElement.addEventListener('focus', () => {
      inputElement.$ci.focus = true
      const { currencyFormat, options } = inputElement.$ci
      const { distractionFree, hideCurrencySymbol, hideGroupingSymbol, hideNegligibleDecimalDigits } = options
      if (distractionFree === true || hideCurrencySymbol || hideGroupingSymbol || hideNegligibleDecimalDigits) {
        setTimeout(() => {
          const { value, selectionStart, selectionEnd } = inputElement
          applyDistractionFreeFormat(inputElement)
          if (Math.abs(selectionStart - selectionEnd) > 0) {
            inputElement.setSelectionRange(0, inputElement.value.length)
          } else {
            setCaretPosition(inputElement, getCaretPositionAfterApplyingDistractionFreeFormat(currencyFormat, options, value, selectionStart))
          }
        })
      }
    })

    inputElement.addEventListener('blur', () => {
      inputElement.$ci.focus = false
      applyFixedFractionFormat(inputElement)
    })
  },
  componentUpdated (el, { value, oldValue }, { context }) {
    if (!!value && optionsChanged(oldValue, value)) {
      const inputElement = init(el, value, context.$CI_DEFAULT_OPTIONS || defaultOptions)
      applyFixedFractionFormat(inputElement, inputElement.$ci.numberValue)
    }
  }
}

const optionsChanged = (oldOptions, newOptions) => {
  return Object.keys(defaultOptions).some((key) => oldOptions[key] !== newOptions[key])
}

const init = (el, optionsFromBinding, defaultOptions) => {
  const inputElement = el.tagName.toLowerCase() === 'input' ? el : el.querySelector('input')
  if (!inputElement) {
    throw new Error('No input element found')
  }
  const options = { ...defaultOptions, ...optionsFromBinding }
  const { min, max, decimalLength, distractionFree, autoDecimalMode } = options
  options.hideCurrencySymbol = distractionFree === true || distractionFree.hideCurrencySymbol
  options.hideNegligibleDecimalDigits = !autoDecimalMode && (distractionFree === true || distractionFree.hideNegligibleDecimalDigits)
  options.hideGroupingSymbol = distractionFree === true || distractionFree.hideGroupingSymbol
  if (min != null && max != null && min > max) {
    throw new Error('Invalid value range')
  }
  if (decimalLength < 0 || decimalLength > 20) {
    throw new Error('Decimal length must be between 0 and 20')
  }
  const currencyFormat = createCurrencyFormat(options)
  if (currencyFormat.decimalLength > 0 && decimalLength !== undefined) {
    currencyFormat.decimalLength = decimalLength
  }
  inputElement.$ci = {
    ...inputElement.$ci || {},
    options,
    currencyFormat,
    decimalFormat: {
      ...currencyFormat,
      prefix: '',
      negativePrefix: '-',
      suffix: ''
    }
  }
  return inputElement
}

const applyFixedFractionFormat = (el, value = parse(el.value, el.$ci.currencyFormat)) => {
  const { options: { min, max }, currencyFormat: { decimalLength } } = el.$ci
  if (value != null) {
    if (min != null && value < min) {
      value = min
    }
    if (max != null && value > max) {
      value = max
    }
    value = value.toFixed(decimalLength)
  }
  format(el, value)
  dispatchEvent(el, 'input')
}

const applyDistractionFreeFormat = (el) => {
  const { options, currencyFormat } = el.$ci
  const { conformedValue, fractionDigits } = conformToMask(el.value, currencyFormat, options.autoDecimalMode)
  if (typeof conformedValue === 'number') {
    el.value = new Intl.NumberFormat(options.locale, {
      style: options.hideCurrencySymbol ? 'decimal' : 'currency',
      useGrouping: !options.hideGroupingSymbol,
      currency: options.currency,
      minimumFractionDigits: options.hideNegligibleDecimalDigits ? fractionDigits.replace(/0+$/, '').length : currencyFormat.decimalLength
    }).format(conformedValue)
  }
  el.$ci.previousConformedValue = el.value
}

const format = (el, value = el.value) => {
  const { options, decimalFormat, currencyFormat, focus, previousConformedValue } = el.$ci
  if (value != null) {
    const hideCurrencySymbol = focus && options.hideCurrencySymbol
    const formatConfig = hideCurrencySymbol ? decimalFormat : currencyFormat
    const { conformedValue, fractionDigits } = conformToMask(value, formatConfig, options, previousConformedValue)
    if (typeof conformedValue === 'number') {
      el.value = new Intl.NumberFormat(options.locale, {
        style: hideCurrencySymbol ? 'decimal' : 'currency',
        useGrouping: !(focus && options.hideGroupingSymbol),
        currency: options.currency,
        minimumFractionDigits: fractionDigits.length
      }).format(conformedValue)
    } else {
      el.value = conformedValue
    }
  } else {
    el.value = null
  }
  el.$ci.previousConformedValue = el.value
  const numberValue = parse(el.value, currencyFormat)
  el.$ci.numberValue = numberValue
  dispatchEvent(el, 'format-complete', { numberValue })
}
