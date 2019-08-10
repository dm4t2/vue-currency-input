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
          format(inputElement)
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
  options.hideNegligibleFractionDigits = options.distractionFree === true || options.distractionFree.hideNegligibleFractionDigits
  options.hideThousandsSeparatorSymbol = options.distractionFree === true || options.distractionFree.hideThousandsSeparatorSymbol
  if (options.min != null && options.max != null && options.min > options.max) {
    throw new Error('Invalid number range')
  }
  inputElement.$ci = {
    ...inputElement.$ci || {},
    options,
    currencyFormat: createCurrencyFormat(options)
  }
  return inputElement
}

const applyFixedFractionFormat = (el, value = parse(el.value, el.$ci.currencyFormat)) => {
  const { options, currencyFormat } = el.$ci
  const { min, max } = options
  if (value != null) {
    if (currencyFormat.maxFractionDigits === 0) {
      value = Math.round(value)
    }
    if (min != null && value < min) {
      value = min
    }
    if (max != null && value > max) {
      value = max
    }
    value = new Intl.NumberFormat(options.locale, { minimumFractionDigits: currencyFormat.maxFractionDigits }).format(value)
  }
  format(el, value)
  dispatchEvent(el, 'input')
}

const format = (el, value = el.value) => {
  const { options, currencyFormat, focus, previousConformedValue } = el.$ci
  if (value != null) {
    const hideCurrencySymbol = focus && options.hideCurrencySymbol
    const { conformedValue, numberOfFractionDigits } = conformToMask(value, {
      ...currencyFormat,
      prefix: hideCurrencySymbol ? '' : currencyFormat.prefix,
      suffix: hideCurrencySymbol ? '' : currencyFormat.suffix
    }, previousConformedValue)
    if (typeof conformedValue === 'number') {
      if (options.validateOnInput && ((options.min != null && conformedValue < options.min) || (options.max != null && conformedValue > options.max))) {
        el.value = previousConformedValue
      } else {
        el.value = new Intl.NumberFormat(options.locale, {
          style: hideCurrencySymbol ? 'decimal' : 'currency',
          useGrouping: !(focus && options.hideThousandsSeparatorSymbol),
          currency: options.currency,
          minimumFractionDigits: focus && options.hideNegligibleFractionDigits ? 0 : numberOfFractionDigits
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
