import getCurrencyFormatConfig from './utils/currencyFormatConfig'
import { parse } from './utils/formatHelper'
import createTextMaskInputElement from 'text-mask-core/src/createTextMaskInputElement'
import createNumberMask from 'text-mask-addons/src/createNumberMask'

export default {
  bind (el, binding) {
    const inputElement = init(el, binding.value)
    applyFixedFractionFormat(inputElement)

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

const DEFAULT_OPTIONS = {
  locale: undefined,
  currency: null,
  distractionFree: true,
  min: null,
  max: null
}

const optionsChanged = (oldOptions, newOptions) => {
  return Object.keys(DEFAULT_OPTIONS).some((key) => oldOptions[key] !== newOptions[key])
}

const init = (el, optionsFromBinding) => {
  const inputElement = el.matches('input') ? el : el.querySelector('input')
  const options = { ...DEFAULT_OPTIONS, ...optionsFromBinding }
  if (options.min !== null && options.max !== null && options.min > options.max) {
    console.warn('Ignoring invalid number range')
    options.min = DEFAULT_OPTIONS.min
    options.max = DEFAULT_OPTIONS.max
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
    if (options.min !== null && value < options.min) {
      value = options.min
    }
    if (options.max !== null && value > options.max) {
      value = options.max
    }
    value = new Intl.NumberFormat(options.locale, { minimumFractionDigits: hideFormatting ? 0 : currencyFormatConfig.decimalLimit }).format(value)
  }
  textMaskInputElement.update(value, {
    inputElement: el,
    guide: false,
    mask: createNumberMask({
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
