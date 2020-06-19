import { DEFAULT_OPTIONS } from './api'
import { getCaretPositionAfterFormat, getDistractionFreeCaretPosition, setCaretPosition } from './utils/caretPosition'
import dispatchEvent from './utils/dispatchEvent'
import equal from './utils/equal'
import { toExternalNumberModel, toInternalNumberModel } from './utils/numberUtils'
import NumberFormat from './numberFormat'
import { AutoDecimalModeNumberMask, DefaultNumberMask } from './numberMask'

const init = (el, optionsFromBinding, { $CI_DEFAULT_OPTIONS }) => {
  const inputElement = el.tagName.toLowerCase() === 'input' ? el : el.querySelector('input')
  if (!inputElement) {
    throw new Error('No input element found')
  }
  const options = { ...($CI_DEFAULT_OPTIONS || DEFAULT_OPTIONS), ...optionsFromBinding }
  const { distractionFree, autoDecimalMode } = options
  if (typeof distractionFree === 'boolean') {
    options.distractionFree = {
      hideCurrencySymbol: distractionFree,
      hideNegligibleDecimalDigits: distractionFree,
      hideGroupingSymbol: distractionFree
    }
  }
  if (autoDecimalMode) {
    options.distractionFree.hideNegligibleDecimalDigits = false
    inputElement.setAttribute('inputmode', 'numeric')
  } else {
    inputElement.setAttribute('inputmode', 'decimal')
  }
  const currencyFormat = new NumberFormat(options)
  inputElement.$ci = {
    ...inputElement.$ci || {},
    options,
    numberMask: options.autoDecimalMode ? new AutoDecimalModeNumberMask(currencyFormat) : new DefaultNumberMask(currencyFormat),
    currencyFormat
  }
  return inputElement
}

const validateValueRange = (value, valueRange) => {
  if (valueRange) {
    const { min, max } = valueRange
    if (min !== undefined && value < min) {
      value = min
    }
    if (max !== undefined && value > max) {
      value = max
    }
  }
  return value
}

const triggerEvent = (el, eventName) => {
  let { numberValue, currencyFormat, options } = el.$ci
  numberValue = toExternalNumberModel(numberValue, options.valueAsInteger, currencyFormat.maximumFractionDigits)
  dispatchEvent(el, eventName, { numberValue })
}

const applyFixedFractionFormat = (el, value, forcedChange = false) => {
  const { currencyFormat, options } = el.$ci
  format(el, value != null ? currencyFormat.format(validateValueRange(value, options.valueRange)) : null)
  if (value !== el.$ci.numberValue || forcedChange) {
    triggerEvent(el, 'change')
  }
}

const updateInputValue = (el, value, hideNegligibleDecimalDigits) => {
  if (value != null) {
    const { focus, options, numberMask, currencyFormat, previousConformedValue } = el.$ci
    const { allowNegative, distractionFree } = options
    const conformedValue = numberMask.conformToMask(value, previousConformedValue)
    let formattedValue
    if (typeof conformedValue === 'object') {
      const { numberValue, fractionDigits } = conformedValue
      let { maximumFractionDigits, minimumFractionDigits } = currencyFormat
      if (focus) {
        minimumFractionDigits = maximumFractionDigits
      }
      minimumFractionDigits = hideNegligibleDecimalDigits
        ? fractionDigits.replace(/0+$/, '').length
        : Math.min(minimumFractionDigits, fractionDigits.length)
      formattedValue = currencyFormat.format(numberValue, {
        useGrouping: !(focus && distractionFree.hideGroupingSymbol),
        minimumFractionDigits,
        maximumFractionDigits
      })
    } else {
      formattedValue = conformedValue
    }
    if (!allowNegative) {
      formattedValue = formattedValue.replace(currencyFormat.negativePrefix, currencyFormat.prefix)
    }
    if (focus && distractionFree.hideCurrencySymbol) {
      formattedValue = formattedValue
        .replace(currencyFormat.negativePrefix, currencyFormat.minusSymbol)
        .replace(currencyFormat.prefix, '')
        .replace(currencyFormat.suffix, '')
    }

    el.value = formattedValue
    el.$ci.numberValue = currencyFormat.parse(el.value)
  } else {
    el.value = el.$ci.numberValue = null
  }
  el.$ci.previousConformedValue = el.value
}

const format = (el, value, hideNegligibleDecimalDigits = false) => {
  updateInputValue(el, value, hideNegligibleDecimalDigits)
  triggerEvent(el, 'input')
}

const addEventListener = (el) => {
  el.addEventListener('input', (e) => {
    if (!e.detail) {
      const { value, selectionStart, $ci: { currencyFormat, options } } = el
      format(el, value)
      if (el.$ci.focus) {
        setCaretPosition(el, getCaretPositionAfterFormat(el.value, value, selectionStart, currencyFormat, options))
      }
    }
  }, { capture: true })

  el.addEventListener('format', (e) => {
    const { currencyFormat, options, numberValue } = el.$ci
    const value = toInternalNumberModel(e.detail.value, options.valueAsInteger, currencyFormat.maximumFractionDigits)
    if (value !== numberValue) {
      applyFixedFractionFormat(el, value)
    }
  })

  el.addEventListener('focus', () => {
    el.$ci.focus = true
    const { hideCurrencySymbol, hideGroupingSymbol, hideNegligibleDecimalDigits } = el.$ci.options.distractionFree
    if (hideCurrencySymbol || hideGroupingSymbol || hideNegligibleDecimalDigits) {
      setTimeout(() => {
        const { value, selectionStart, selectionEnd } = el
        format(el, el.value, hideNegligibleDecimalDigits)
        if (Math.abs(selectionStart - selectionEnd) > 0) {
          el.setSelectionRange(0, el.value.length)
        } else {
          setCaretPosition(el, getDistractionFreeCaretPosition(el.$ci.currencyFormat, el.$ci.options, value, selectionStart))
        }
      })
    }
  })

  el.addEventListener('blur', () => {
    el.$ci.focus = false
    applyFixedFractionFormat(el, el.$ci.numberValue)
  })

  el.addEventListener('change', (e) => {
    if (!e.detail) {
      triggerEvent(el, 'change')
    }
  })
}

export default {
  bind (el, { value: options }, { context }) {
    const inputElement = init(el, options, context)
    const { value, $ci: { currencyFormat } } = inputElement
    if (value) {
      applyFixedFractionFormat(inputElement, toInternalNumberModel(currencyFormat.parse(value), options.valueAsInteger, currencyFormat.maximumFractionDigits))
    }
    addEventListener(inputElement)
  },
  componentUpdated (el, { value, oldValue }, { context }) {
    if (!equal(value, oldValue)) {
      const inputElement = init(el, value, context)
      applyFixedFractionFormat(inputElement, inputElement.$ci.numberValue, true)
    }
  }
}
