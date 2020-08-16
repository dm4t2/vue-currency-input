import { DEFAULT_OPTIONS, setValue } from './api'
import { getCaretPositionAfterFormat, getDistractionFreeCaretPosition, setCaretPosition } from './utils/caretPosition'
import dispatchEvent from './utils/dispatchEvent'
import equal from './utils/equal'
import { toExternalNumberModel } from './utils/numberUtils'
import NumberFormat, { DECIMAL_SYMBOLS } from './numberFormat'
import { AutoDecimalModeNumberMask, DefaultNumberMask } from './numberMask'

const MAX_SAFE_INTEGER = Math.pow(2, 53) - 1

const init = (el, optionsFromBinding, { $ci }) => {
  const inputElement = el.tagName.toLowerCase() === 'input' ? el : el.querySelector('input')
  if (!inputElement) {
    throw new Error('No input element found')
  }
  const options = { ...($ci ? $ci.GLOBAL_OPTIONS : DEFAULT_OPTIONS), ...optionsFromBinding }
  const { distractionFree, autoDecimalMode, valueRange } = options
  if (typeof distractionFree === 'boolean') {
    options.distractionFree = {
      hideCurrencySymbol: distractionFree,
      hideNegligibleDecimalDigits: distractionFree,
      hideGroupingSymbol: distractionFree
    }
  }
  if (valueRange) {
    options.valueRange = {
      min: valueRange.min !== undefined ? Math.max(valueRange.min, -MAX_SAFE_INTEGER) : -MAX_SAFE_INTEGER,
      max: valueRange.max !== undefined ? Math.min(valueRange.max, MAX_SAFE_INTEGER) : MAX_SAFE_INTEGER
    }
  } else {
    options.valueRange = {
      min: -MAX_SAFE_INTEGER,
      max: MAX_SAFE_INTEGER
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
    ...inputElement.$ci || { numberValue: null },
    options,
    numberMask: options.autoDecimalMode ? new AutoDecimalModeNumberMask(currencyFormat) : new DefaultNumberMask(currencyFormat),
    currencyFormat
  }
  return inputElement
}

const triggerEvent = (el, eventName) => {
  let { numberValue, currencyFormat, options } = el.$ci
  numberValue = toExternalNumberModel(numberValue, options.valueAsInteger, currencyFormat.maximumFractionDigits)
  dispatchEvent(el, eventName, { numberValue })
}

const applyFixedFractionFormat = (el, value, forcedChange = false) => {
  const { currencyFormat, options } = el.$ci
  const { min, max } = options.valueRange
  const validateValueRange = () => Math.min(Math.max(value, min), max)
  format(el, value != null ? currencyFormat.format(validateValueRange()) : null)
  if (value !== el.$ci.numberValue || forcedChange) {
    triggerEvent(el, 'change')
  }
}

const updateInputValue = (el, value, hideNegligibleDecimalDigits) => {
  if (value != null) {
    const { focus, decimalSymbolInsertedAt, options, numberMask, currencyFormat, previousConformedValue } = el.$ci
    const { allowNegative, distractionFree } = options
    if (decimalSymbolInsertedAt !== undefined) {
      value = currencyFormat.normalizeDecimalSymbol(value, decimalSymbolInsertedAt)
      el.$ci.decimalSymbolInsertedAt = undefined
    }
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
      formattedValue = numberValue > MAX_SAFE_INTEGER
        ? previousConformedValue
        : currencyFormat.format(numberValue, {
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

const addEventListener = el => {
  el.addEventListener('input', e => {
    if (!e.detail) {
      const { value, selectionStart, $ci: { currencyFormat, options } } = el
      format(el, value)
      if (el.$ci.focus) {
        setCaretPosition(el, getCaretPositionAfterFormat(el.value, value, selectionStart, currencyFormat, options))
      }
    }
  }, { capture: true })

  el.addEventListener('keypress', e => {
    if (DECIMAL_SYMBOLS.includes(e.key)) {
      el.$ci.decimalSymbolInsertedAt = el.selectionStart
    }
  })

  el.addEventListener('format', e => {
    const { currencyFormat, options, numberValue } = el.$ci
    const toInternalNumberModel = n => options.valueAsInteger && n != null ? n / Math.pow(10, currencyFormat.maximumFractionDigits) : n
    const newValue = toInternalNumberModel(e.detail.value)
    if (numberValue !== newValue) {
      applyFixedFractionFormat(el, newValue)
    }
  })

  el.addEventListener('focus', () => {
    el.$ci.focus = true
    const { hideCurrencySymbol, hideGroupingSymbol, hideNegligibleDecimalDigits } = el.$ci.options.distractionFree
    if (hideCurrencySymbol || hideGroupingSymbol || hideNegligibleDecimalDigits) {
      setTimeout(() => {
        const { value, selectionStart, selectionEnd } = el
        if (value) {
          format(el, value, hideNegligibleDecimalDigits)
        }
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
    if (el.$ci.numberValue != null) {
      applyFixedFractionFormat(el, el.$ci.numberValue)
    }
  })

  el.addEventListener('change', e => {
    if (!e.detail) {
      triggerEvent(el, 'change')
    }
  })
}

export default {
  bind (el, { value }, { context }) {
    const inputElement = init(el, value, context)
    addEventListener(inputElement)
    setValue(inputElement, inputElement.$ci.currencyFormat.parse(inputElement.value))
  },
  componentUpdated (el, { value, oldValue }, { context }) {
    if (!equal(value, oldValue)) {
      const inputElement = init(el, value, context)
      applyFixedFractionFormat(inputElement, inputElement.$ci.numberValue, true)
    }
  }
}
