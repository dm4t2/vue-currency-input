<template>
  <input
    v-currency="options"
    :value="formattedValue"
    v-on="listeners()">
</template>

<script>
import currencyDirective from './currencyDirective'
import defaultOptions from './defaultOptions'
import { parse } from './utils/formatHelper'
import currencyFormatConfig from './utils/currencyFormatConfig'

export default {
  name: 'CurrencyInput',
  directives: {
    currency: currencyDirective
  },
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
      default: undefined
    },
    distractionFree: {
      type: Boolean,
      default: undefined
    },
    min: {
      type: Number,
      default: undefined
    },
    max: {
      type: Number,
      default: undefined
    },
    validateOnInput: {
      type: Boolean,
      default: undefined
    }
  },
  data () {
    return {
      formattedValue: this.value
    }
  },
  computed: {
    options () {
      const options = { ...this.$CI_DEFAULT_OPTIONS || defaultOptions }
      Object.keys(options).forEach((key) => {
        if (this[key] !== undefined) {
          options[key] = this[key]
        }
      })
      return options
    },
    currencyFormatConfig () {
      return currencyFormatConfig(this.options.locale, this.options.currency)
    }
  },
  watch: {
    value (value) {
      this.$el.dispatchEvent(new CustomEvent('format', { detail: { value } }))
    }
  },
  methods: {
    listeners () {
      return {
        ...this.$listeners,
        input: () => this.emitValue(),
        'format-complete': () => this.emitValue()
      }
    },
    emitValue () {
      this.$emit('input', parse(this.$el.value, this.currencyFormatConfig))
      this.formattedValue = this.$el.value
    }
  }
}
</script>
