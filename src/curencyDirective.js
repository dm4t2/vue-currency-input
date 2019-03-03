import { format, getCaretPosition, getCurrencyFormatConfig, parse } from './utils/formatHelper'
import createNumberMask from 'text-mask-addons/src/createNumberMask'
import createTextMaskInputElement from 'text-mask-core/src/createTextMaskInputElement'

export default {
  bind (el, binding) {
    const inputElement = init(el, binding.value)
    applyFixedFractionFormat(inputElement)

    inputElement.addEventListener('input', () => {
      format(inputElement)
      el.dispatchEvent(new Event('ci-input'))
    }, { capture: true })
    inputElement.addEventListener('focus', () => {
      const { options, currencyFormatConfig } = inputElement.$ci
      if (options.distractionFree) {
        inputElement.$ci.focus = true
        setTimeout(() => {
          const caretPosition = getCaretPosition(inputElement, currencyFormatConfig)
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
    if (
      binding.value.locale !== binding.oldValue.locale ||
      binding.value.currency !== binding.oldValue.currency ||
      binding.value.distractionFree !== binding.oldValue.distractionFree ||
      binding.value.allowNegative !== binding.oldValue.allowNegative
    ) {
      const inputElement = init(el, binding.value)
      applyFixedFractionFormat(inputElement, inputElement.$ci.numberValue)
    }
  }
}

const DEFAULT_OPTIONS = {
  distractionFree: true,
  allowNegative: true
}

const init = (el, optionsFromBinding) => {
  const inputElement = el.matches('input') ? el : el.querySelector('input')
  if (!inputElement) {
    throw new Error('The <v-currency> directive must be applied on an element consists of an input element')
  }
  const options = { ...DEFAULT_OPTIONS, ...optionsFromBinding }
  const currencyFormatConfig = getCurrencyFormatConfig(options)
  const textMaskInputElement = createTextMaskInputElement({
    inputElement,
    guide: false,
    mask: createNumberMask(currencyFormatConfig)
  })
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
  el.dispatchEvent(new Event('change'))
}
