import { getCaretPosition, getCurrencyFormatConfig, parse } from './utils/formatHelper'
import createNumberMask from 'text-mask-addons/src/createNumberMask'
import createTextMaskInputElement from 'text-mask-core/src/createTextMaskInputElement'

export default {
  bind (el, binding) {
    const inputElement = init(el, binding.value)
    applyFixedFractionFormat(inputElement)

    inputElement.addEventListener('input', (e) => {
      format(inputElement)
      el.dispatchEvent(new CustomEvent('format', {
        detail: {
          formattedValue: inputElement.value,
          numberValue: JSON.parse(inputElement.dataset.numberValue)
        }
      }))
    }, { capture: true })
    inputElement.addEventListener('focus', () => {
      const directiveOptions = JSON.parse(inputElement.dataset.options)
      inputElement.dataset.focus = JSON.stringify(true)
      if (directiveOptions.distractionFree) {
        setTimeout(() => {
          const currencyFormatConfig = getCurrencyFormatConfig(directiveOptions)
          const caretPosition = getCaretPosition(inputElement, currencyFormatConfig)
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
    throw new Error('The <v-currency> directive must be applied on an element consists of an input element')
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
  el.dispatchEvent(new CustomEvent('input'))
  el.dispatchEvent(new CustomEvent('change'))
}

export const format = (el, value = el.value) => {
  const options = JSON.parse(el.dataset.options)
  const currencyFormatConfig = getCurrencyFormatConfig(options)
  const focus = el.dataset.focus
  if (typeof value === 'number') {
    value = new Intl.NumberFormat(options.locale, { minimumFractionDigits: focus && options.distractionFree ? 0 : currencyFormatConfig.decimalLimit }).format(value)
  }
  createTextMaskInputElement({
    inputElement: el,
    guide: false,
    mask: createNumberMask({
      ...currencyFormatConfig,
      prefix: focus && options.distractionFree ? '' : currencyFormatConfig.prefix,
      suffix: focus && options.distractionFree ? '' : currencyFormatConfig.suffix,
      thousandsSeparatorSymbol: focus && options.distractionFree ? '' : currencyFormatConfig.thousandsSeparatorSymbol
    })
  }).update(value)
  el.dataset.numberValue = JSON.stringify(parse(el.value, currencyFormatConfig))
}
