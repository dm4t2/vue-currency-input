import { createTextMaskInputElement } from 'text-mask-core'
import Vue from 'vue'
import defaultOptions from './defaultOptions'
import createCurrencyMask from './utils/createCurrencyMask'
import currencyFormatConfig from './utils/currencyFormatConfig'
import dispatchEvent from './utils/dispatchEvent'
import elementMatches from './utils/elementMatches'
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
      format(inputElement)
    }, { capture: true })

    inputElement.addEventListener('format', ({ detail }) => {
      if (!inputElement.$ci.focus) {
        format(inputElement, detail.value)
      }
    })

    inputElement.addEventListener('focus', () => {
      const { options, currencyFormatConfig } = inputElement.$ci
      inputElement.$ci.focus = true
      if (options.distractionFree) {
        setTimeout(() => {
          const caretPosition = getCaretPosition(inputElement)
          format(inputElement, parse(inputElement.value, currencyFormatConfig))
          inputElement.setSelectionRange(caretPosition, caretPosition)
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
  const inputElement = elementMatches(el, 'input') ? el : el.querySelector('input')
  if (!inputElement) {
    throw new Error('The directive must be applied on an element consists of an input element')
  }
  const options = { ...defaultOptions, ...optionsFromBinding }
  if (options.min != null && options.max != null && options.min > options.max) {
    throw new Error('Invalid number range')
  }
  inputElement.$ci = {
    ...inputElement.$ci || {},
    options,
    currencyFormatConfig: currencyFormatConfig(options.locale, options.currency),
    textMaskInputElement: createTextMaskInputElement({ inputElement, mask: [] })
  }
  return inputElement
}

const applyFixedFractionFormat = (el, value = parse(el.value, el.$ci.currencyFormatConfig)) => {
  if (value != null && !el.$ci.currencyFormatConfig.allowDecimal) {
    value = Math.round(value)
  }
  format(el, value)
  dispatchEvent(el, 'input')
}

const format = (el, value = el.value, { options, currencyFormatConfig, textMaskInputElement, focus } = el.$ci) => {
  const hideNegligibleFractionDigits = focus && (options.distractionFree === true || options.distractionFree.hideNegligibleFractionDigits)
  const hideCurrencySymbol = focus && (options.distractionFree === true || options.distractionFree.hideCurrencySymbol)
  const hideThousandsSeparatorSymbol = focus && (options.distractionFree === true || options.distractionFree.hideThousandsSeparatorSymbol)
  if (typeof value === 'number') {
    if (options.min != null && value < options.min) {
      value = options.min
    }
    if (options.max != null && value > options.max) {
      value = options.max
    }
    value = new Intl.NumberFormat(options.locale, { minimumFractionDigits: hideNegligibleFractionDigits ? 0 : currencyFormatConfig.decimalLimit }).format(value)
    if (options.distractionFree) {
      // force invalidation of text mask's previousConformedValue
      value += ' '
    }
  }
  textMaskInputElement.update(value, {
    inputElement: el,
    pipe: (conformedValue, { previousConformedValue }) => {
      if (options.validateOnInput) {
        if (options.min != null && parse(conformedValue, currencyFormatConfig) < options.min) {
          return previousConformedValue
        }
        if (options.max != null && parse(conformedValue, currencyFormatConfig) > options.max) {
          return previousConformedValue
        }
      }
      return conformedValue
    },
    mask: createCurrencyMask({
      ...currencyFormatConfig,
      prefix: hideCurrencySymbol ? '' : currencyFormatConfig.prefix,
      suffix: hideCurrencySymbol ? '' : currencyFormatConfig.suffix,
      thousandsSeparatorSymbol: hideThousandsSeparatorSymbol ? '' : currencyFormatConfig.thousandsSeparatorSymbol,
      allowNegative: (options.min === null && options.max === null) || options.min < 0 || options.max < 0
    })
  })
  const numberValue = parse(el.value, currencyFormatConfig)
  el.$ci.numberValue = numberValue
  dispatchEvent(el, 'format-complete', { numberValue })
}

const getCaretPosition = (el) => {
  const { prefix, thousandsSeparatorSymbol } = el.$ci.currencyFormatConfig
  const { distractionFree } = el.$ci.options
  const hideCurrencySymbol = distractionFree === true || distractionFree.hideCurrencySymbol
  const hideThousandsSeparatorSymbol = distractionFree === true || distractionFree.hideThousandsSeparatorSymbol

  let position = el.selectionStart
  if (hideCurrencySymbol) {
    position -= prefix.length
  }
  if (hideThousandsSeparatorSymbol) {
    const thousandsSeparatorSymbolCount = (el.value.substring(0, el.selectionStart).match(new RegExp(thousandsSeparatorSymbol === '.' ? '\\.' : thousandsSeparatorSymbol, 'g')) || []).length
    position -= thousandsSeparatorSymbolCount
  }
  return Math.max(0, position)
}
