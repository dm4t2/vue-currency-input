<template>
  <input
    v-currency="{locale, currency, distractionFree, min, max}"
    :value="formattedValue"
    @change="handleChange">
</template>

<script>
import currencyDirective from './curencyDirective'

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
      required: true
    },
    distractionFree: {
      type: Boolean,
      default: true
    },
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
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
