<template>
  <input
    v-currency="{locale, currency, distractionFree, min, max}"
    :value="formattedValue"
    @change="handleChange">
</template>

<script>
import currencyDirective from './curencyDirective'
import defaultOptions from './defaultOptions'

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
      default: defaultOptions.locale
    },
    currency: {
      type: String,
      required: true
    },
    distractionFree: {
      type: Boolean,
      default: defaultOptions.distractionFree
    },
    min: {
      type: Number,
      default: defaultOptions.min
    },
    max: {
      type: Number,
      default: defaultOptions.max
    }
  },
  data () {
    return {
      formattedValue: this.value
    }
  },
  watch: {
    value (value) {
      if (!this.$el.$ci.focus) {
        this.$el.dispatchEvent(new CustomEvent('input', { detail: { value } }))
      }
    }
  },
  methods: {
    handleChange ({ detail }) {
      if (detail) {
        this.$emit('input', detail.numberValue)
        this.formattedValue = detail.formattedValue
      }
    }
  }
}
</script>
