import Vue from 'vue'
import defaultOptions from './defaultOptions'
import createCurrencyFormat from './utils/createCurrencyFormat'
import dispatchEvent from './utils/dispatchEvent'
import { parse } from './utils/formatHelper'
import conformToMask from './utils/conformToMask'
import { getCaretPositionAfterFormat, getCaretPositionOnFocus, setCaretPosition } from './utils/caretPosition'

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
      if (inputElement.$ci.options.distractionFree) {
        setTimeout(() => {
          const position = getCaretPositionOnFocus(inputElement)
          applyDistractionFreeFormat(inputElement)
          setCaretPosition(inputElement, position)
        }, 0)
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
    throw new Error('The directive must be applied on an element consists of an input element')
  }
  const options = { ...defaultOptions, ...optionsFromBinding }
  options.hideCurrencySymbol = options.distractionFree === true || options.distractionFree.hideCurrencySymbol
  options.hideNegligibleDecimalDigits = options.distractionFree === true || options.distractionFree.hideNegligibleDecimalDigits
  options.hideThousandsSeparatorSymbol = options.distractionFree === true || options.distractionFree.hideThousandsSeparatorSymbol
  const { min, max, decimalLength } = options
  if (min != null && max != null && min > max) {
    throw new Error('Invalid number range')
  }
  if (decimalLength < 0 || decimalLength > 20) {
    throw new Error('Decimal length must be between 0 and 20')
  }
  const currencyFormat = createCurrencyFormat(options)
  if (currencyFormat.decimalLength > 0 && options.decimalLength !== undefined) {
    currencyFormat.decimalLength = options.decimalLength
  }
  inputElement.$ci = {
    ...inputElement.$ci || {},
    options,
    currencyFormat
  }
  return inputElement
}

const applyFixedFractionFormat = (el, value = parse(el.value, el.$ci.currencyFormat)) => {
  const { options, currencyFormat } = el.$ci
  const { min, max } = options
  if (value != null) {
    if (currencyFormat.decimalLength === 0) {
      value = Math.round(value)
    }
    if (min != null && value < min) {
      value = min
    }
    if (max != null && value > max) {
      value = max
    }
    value = new Intl.NumberFormat(options.locale, { minimumFractionDigits: currencyFormat.decimalLength }).format(value)
  }
  format(el, value)
  dispatchEvent(el, 'input')
}

const applyDistractionFreeFormat = (el) => {
  const { options, currencyFormat } = el.$ci
  const { conformedValue, fractionDigits } = conformToMask(el.value, currencyFormat)
  if (typeof conformedValue === 'number') {
    el.value = new Intl.NumberFormat(options.locale, {
      style: options.hideCurrencySymbol ? 'decimal' : 'currency',
      useGrouping: !options.hideThousandsSeparatorSymbol,
      currency: options.currency,
      minimumFractionDigits: options.hideNegligibleDecimalDigits ? fractionDigits.replace(/0+$/, '').length : fractionDigits.length
    }).format(conformedValue)
  }
  el.$ci.previousConformedValue = el.value
}

const format = (el, value = el.value) => {
  const { options, currencyFormat, focus, previousConformedValue } = el.$ci
  if (value != null) {
    const hideCurrencySymbol = focus && options.hideCurrencySymbol
    const { conformedValue, fractionDigits } = conformToMask(value, {
      ...currencyFormat,
      prefix: hideCurrencySymbol ? '' : currencyFormat.prefix,
      suffix: hideCurrencySymbol ? '' : currencyFormat.suffix
    }, previousConformedValue)
    if (typeof conformedValue === 'number') {
      const { min, max } = options
      if (options.validateOnInput && ((min != null && conformedValue < min) || (max != null && conformedValue > max))) {
        el.value = previousConformedValue || null
      } else {
        el.value = new Intl.NumberFormat(options.locale, {
          style: hideCurrencySymbol ? 'decimal' : 'currency',
          useGrouping: !(focus && options.hideThousandsSeparatorSymbol),
          currency: options.currency,
          minimumFractionDigits: fractionDigits.length
        }).format(conformedValue)
      }
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
