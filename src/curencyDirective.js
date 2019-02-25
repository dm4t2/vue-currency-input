import { createTextMaskInputElement } from 'text-mask-core'
import createNumberMask from './utils/createNumberMask'
import { getCaretPosition, getCurrencyFormatConfig, parse } from './utils/formatHelper'

export default {
  bind (el, binding) {
    const inputElement = init(el, binding.value)
    applyFixedFractionFormat(inputElement)

    inputElement.addEventListener('focus', () => {
      const directiveOptions = JSON.parse(inputElement.dataset.options)
      inputElement.dataset.focus = JSON.stringify(true)
      if (directiveOptions.distractionFree) {
        setTimeout(() => {
          const currencyFormatConfig = getCurrencyFormatConfig(directiveOptions)
          const caretPosition = getCaretPosition(inputElement, currencyFormatConfig)
          console.log(caretPosition)
          format(inputElement, parse(inputElement.value, currencyFormatConfig))
          inputElement.setSelectionRange(caretPosition, caretPosition)
        }, 0)
      }
    })
    inputElement.addEventListener('blur', () => {
      delete inputElement.dataset.focus
      applyFixedFractionFormat(inputElement)
    })
  },
  componentUpdated (el, binding) {
    if (
      binding.value.locale !== binding.oldValue.locale ||
      binding.value.currency !== binding.oldValue.currency ||
      binding.value.distractionFree !== binding.oldValue.distractionFree ||
      binding.value.allowNegative !== binding.oldValue.allowNegative
    ) {
      const inputElement = init(el, binding.value)
      applyFixedFractionFormat(inputElement, JSON.parse(inputElement.dataset.numberValue))
    }
  }
}

const init = (el, options) => {
  const inputElement = el.matches('input') ? el : el.querySelector('input')
  if (!inputElement) {
    throw new Error('The Currency Vue Directive must be applied on an element consists of an input element')
  }
  inputElement.dataset.options = JSON.stringify({
    distractionFree: true,
    allowNegative: true,
    ...options
  })
  return inputElement
}

const applyFixedFractionFormat = (el, value = parse(el.value, getCurrencyFormatConfig(JSON.parse(el.dataset.options)))) => {
  format(el, value)
  el.dispatchEvent(new CustomEvent('input', { detail: { value } }))
  el.dispatchEvent(new CustomEvent('change', { detail: { value } }))
}

const format = (el, value = el.value) => {
  const options = JSON.parse(el.dataset.options)
  const currencyFormatConfig = getCurrencyFormatConfig(options)
  const focus = el.dataset.focus
  if (typeof value === 'number') {
    el.dataset.numberValue = JSON.stringify(value)
    value = new Intl.NumberFormat(options.locale, { minimumFractionDigits: focus ? 0 : currencyFormatConfig.decimalLimit }).format(value)
  }
  createTextMaskInputElement({
    inputElement: el,
    guide: false,
    mask: createNumberMask({
      ...currencyFormatConfig,
      prefix: focus ? '' : currencyFormatConfig.prefix,
      suffix: focus ? '' : currencyFormatConfig.suffix,
      thousandsSeparatorSymbol: focus ? '' : currencyFormatConfig.thousandsSeparatorSymbol
    })
  }).update(value)
}
