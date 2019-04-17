import getCurrencyFormatConfig from './utils/currencyFormatConfig'
import { isNumeric, parse } from './utils/formatHelper'
import createTextMaskInputElement from 'text-mask-core/src/createTextMaskInputElement'
import defaultOptions from './defaultOptions'
import createCurrencyMask from './utils/createCurrencyMask'

export default {
  bind (el, binding) {
    const inputElement = init(el, binding.value)
    applyFixedFractionFormat(inputElement, isNumeric(inputElement.value) ? Number(inputElement.value) : null)

    inputElement.addEventListener('input', ({ detail }) => {
      format(inputElement, detail ? detail.value : inputElement.value)
      el.dispatchEvent(new CustomEvent('change', {
        detail: {
          numberValue: inputElement.$ci.numberValue,
          formattedValue: inputElement.value
        }
      }))
    }, { capture: true })

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
  componentUpdated (el, binding) {
    if (optionsChanged(binding.oldValue, binding.value)) {
      const inputElement = init(el, binding.value)
      applyFixedFractionFormat(inputElement, inputElement.$ci.numberValue)
    }
  }
}

const optionsChanged = (oldOptions, newOptions) => {
  return Object.keys(defaultOptions).some((key) => oldOptions[key] !== newOptions[key])
}

const init = (el, optionsFromBinding) => {
  const inputElement = el.matches('input') ? el : el.querySelector('input')
  if (!inputElement) {
    throw new Error('The directive must be applied on an element consists of an input element')
  }
  const options = { ...defaultOptions, ...optionsFromBinding }
  if (options.min != null && options.max != null && options.min > options.max) {
    throw new Error('Invalid number range')
  }
  const currencyFormatConfig = getCurrencyFormatConfig(options)
  const textMaskInputElement = createTextMaskInputElement({ inputElement, mask: [] })
  inputElement.$ci = {
    ...inputElement.$ci || {},
    options,
    currencyFormatConfig,
    textMaskInputElement
  }
  return inputElement
}

const applyFixedFractionFormat = (el, value = parse(el.value, el.$ci.currencyFormatConfig)) => {
  if (value != null && !el.$ci.currencyFormatConfig.allowDecimal) {
    value = Math.round(value)
  }
  format(el, value)
  el.dispatchEvent(new Event('input'))
  el.dispatchEvent(new CustomEvent('change', {
    detail: {
      numberValue: el.$ci.numberValue,
      formattedValue: el.value
    }
  }))
}

const format = (el, value = el.value, { options, currencyFormatConfig, textMaskInputElement, focus } = el.$ci) => {
  const hideFormatting = focus && options.distractionFree
  if (typeof value === 'number') {
    if (options.min != null && value < options.min) {
      value = options.min
    }
    if (options.max != null && value > options.max) {
      value = options.max
    }
    value = new Intl.NumberFormat(options.locale, { minimumFractionDigits: hideFormatting ? 0 : currencyFormatConfig.decimalLimit }).format(value)
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
      prefix: hideFormatting ? '' : currencyFormatConfig.prefix,
      suffix: hideFormatting ? '' : currencyFormatConfig.suffix,
      thousandsSeparatorSymbol: hideFormatting ? '' : currencyFormatConfig.thousandsSeparatorSymbol,
      allowNegative: (options.min === null && options.max === null) || options.min < 0 || options.max < 0
    })
  })
  el.$ci.numberValue = parse(el.value, currencyFormatConfig)
}

const getCaretPosition = (el, { prefix, thousandsSeparatorSymbol } = el.$ci.currencyFormatConfig) => {
  return Math.max(0,
    el.selectionStart -
    prefix.length -
    (el.value.substring(0, el.selectionStart).match(new RegExp(thousandsSeparatorSymbol === '.' ? '\\.' : thousandsSeparatorSymbol, 'g')) || []).length
  )
}
