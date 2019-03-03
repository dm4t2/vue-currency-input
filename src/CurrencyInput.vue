<template>
  <input
    v-currency="{locale, currency, distractionFree, allowNegative}"
    :value="formattedValue"
    @ci-input="handleInput">
</template>

<script>
import currencyDirective from './curencyDirective'
import { format } from './utils/formatHelper'

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
    allowNegative: {
      type: Boolean,
      default: true
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
        format(this.$el, value)
      }
    }
  },
  methods: {
    handleInput () {
      this.$emit('input', this.$el.$ci.numberValue)
      this.formattedValue = this.$el.value
    }
  }
}
</script>
