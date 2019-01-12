<template>
  <input
    :value="formattedValue"
    v-on="listeners">
</template>

<script>
import { createTextMaskInputElement } from 'text-mask-core'
import createNumberMask from '../utils/createNumberMask'
import { parse } from '../utils/formatHelper'

export default {
  name: 'CurrencyInput',
  props: {
    value: {
      type: Number,
      default: null
    },
    locale: {
      type: String,
      default: undefined
    },
    currency: {
      type: String,
      required: true
    },
    distractionFree: {
      type: Boolean,
      default: true
    },
    allowNegative: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      focus: false,
      formattedValue: '',
      numberValue: this.value
    }
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners,
        input: (e) => this.handleInput(e),
        focus: (e) => this.handleFocus(e),
        blur: () => this.handleBlur()
      }
    },
    config () {
      const formattedNumber = this.currencyFormat.format(1234)
      const allowDecimal = formattedNumber.indexOf('0') !== -1
      return {
        prefix: this.focus && this.distractionFree ? '' : formattedNumber.substring(0, formattedNumber.indexOf('1')),
        suffix: this.focus && this.distractionFree ? '' : formattedNumber.substring(formattedNumber.lastIndexOf(allowDecimal ? '0' : '4') + 1),
        decimalSymbol: allowDecimal ? formattedNumber.substr(formattedNumber.indexOf('4') + 1, 1) : null,
        thousandsSeparatorSymbol: formattedNumber.substr(formattedNumber.indexOf('1') + 1, 1),
        allowNegative: this.allowNegative,
        allowDecimal
      }
    },
    textMaskInputElement () {
      return createTextMaskInputElement({
        inputElement: this.$el,
        guide: false,
        mask: createNumberMask(this.config)
      })
    },
    currencyFormat () {
      return new Intl.NumberFormat(this.locale, {
        style: 'currency',
        currency: this.currency
      })
    },
    fixedFractionNumberFormat () {
      return new Intl.NumberFormat(this.locale, { minimumFractionDigits: this.config.allowDecimal ? 2 : 0 })
    }
  },
  watch: {
    value (value) {
      if (!this.focus) {
        this.updateValue(this.fixedFractionNumberFormat.format(value))
      }
    },
    allowNegative () {
      this.updateValue(this.formattedValue)
    },
    locale: 'applyFixedFractionFormat',
    currency: 'applyFixedFractionFormat'
  },
  mounted () {
    this.applyFixedFractionFormat()
  },
  methods: {
    handleInput (e) {
      this.updateValue(e.target.value)
    },
    handleBlur () {
      this.focus = false
      this.applyFixedFractionFormat()
    },
    handleFocus (e) {
      this.$nextTick(() => {
        const caretPosition = e.target.selectionStart - this.config.prefix.length
        this.focus = true
        if (this.numberValue !== null && this.distractionFree) {
          this.format(new Intl.NumberFormat(this.locale).format(this.numberValue))
          this.setCaretPosition(Math.max(0, caretPosition))
        }
      })
    },
    updateValue (value) {
      this.format(value)
      this.numberValue = parse(this.formattedValue, this.config)
      this.$emit('input', this.numberValue)
    },
    format (value) {
      this.textMaskInputElement.update(value)
      this.formattedValue = this.$el.value
    },
    applyFixedFractionFormat () {
      if (this.numberValue === null) {
        this.formattedValue = ''
      } else {
        this.format(this.fixedFractionNumberFormat.format(this.numberValue.toFixed(2)))
      }
    },
    setCaretPosition (caretPosition) {
      this.$el.setSelectionRange(caretPosition, caretPosition)
    }
  }
}
</script>
