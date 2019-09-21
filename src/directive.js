import Vue from 'vue'
import defaultOptions from './defaultOptions'
import { getCaretPositionAfterApplyingDistractionFreeFormat, getCaretPositionAfterFormat, setCaretPosition } from './utils/caretPosition'
import conformToMask from './utils/conformToMask'
import createCurrencyFormat from './utils/createCurrencyFormat'
import dispatchEvent from './utils/dispatchEvent'
import parse from './utils/parse'

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
  options.hideCurrencySymbol = options.currency == null || distractionFree === true || distractionFree.hideCurrencySymbol
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

function updateInputValue (el, value, distractionFree = false) {
  if (value != null) {
    const { options, decimalFormat, currencyFormat, focus, previousConformedValue } = el.$ci
    const hideCurrencySymbol = focus && options.hideCurrencySymbol
    const formatConfig = hideCurrencySymbol ? decimalFormat : currencyFormat
    const { conformedValue, fractionDigits } = conformToMask(value, formatConfig, options, previousConformedValue)
    if (typeof conformedValue === 'number') {
      const formattedValue = new Intl.NumberFormat(options.locale, {
        useGrouping: !(focus && options.hideGroupingSymbol),
        minimumFractionDigits: distractionFree
          ? (options.hideNegligibleDecimalDigits ? fractionDigits.replace(/0+$/, '').length : currencyFormat.decimalLength)
          : fractionDigits.length
      }).format(conformedValue)
      el.value = `${conformedValue < 0 ? formatConfig.negativePrefix : formatConfig.prefix}${formattedValue}${formatConfig.suffix}`
    } else {
      el.value = conformedValue
    }
  } else {
    el.value = null
  }
  el.$ci.previousConformedValue = el.value
}

const format = (el, value = el.value) => {
  updateInputValue(el, value)
  const numberValue = parse(el.value, el.$ci.currencyFormat)
  el.$ci.numberValue = numberValue
  dispatchEvent(el, 'format-complete', { numberValue })
}

function addEventListener (el) {
  el.addEventListener('input', () => {
    if (el.$ci.focus) {
      const { value, selectionStart } = el
      format(el)
      setCaretPosition(el, getCaretPositionAfterFormat(el, value, selectionStart))
    } else {
      format(el)
    }
  }, { capture: true })

  el.addEventListener('format', ({ detail }) => {
    if (!el.$ci.focus) {
      applyFixedFractionFormat(el, detail.value)
    }
  })

  el.addEventListener('focus', () => {
    el.$ci.focus = true
    const { currencyFormat, options } = el.$ci
    const { distractionFree, hideCurrencySymbol, hideGroupingSymbol, hideNegligibleDecimalDigits } = options
    if (distractionFree === true || hideCurrencySymbol || hideGroupingSymbol || hideNegligibleDecimalDigits) {
      setTimeout(() => {
        const { value, selectionStart, selectionEnd } = el
        updateInputValue(el, el.value, true)
        if (Math.abs(selectionStart - selectionEnd) > 0) {
          el.setSelectionRange(0, el.value.length)
        } else {
          setCaretPosition(el, getCaretPositionAfterApplyingDistractionFreeFormat(currencyFormat, options, value, selectionStart))
        }
      })
    }
  })

  el.addEventListener('blur', () => {
    el.$ci.focus = false
    applyFixedFractionFormat(el)
  })
}

export default {
  bind (el, { value: options }, { context }) {
    const inputElement = init(el, options, context.$CI_DEFAULT_OPTIONS || defaultOptions)
    Vue.nextTick(() => {
      if (inputElement.value) {
        applyFixedFractionFormat(inputElement)
      }
    })

    addEventListener(inputElement)
  },
  componentUpdated (el, { value, oldValue }, { context }) {
    if (!!value && optionsChanged(oldValue, value)) {
      const inputElement = init(el, value, context.$CI_DEFAULT_OPTIONS || defaultOptions)
      applyFixedFractionFormat(inputElement, inputElement.$ci.numberValue)
    }
  }
}
