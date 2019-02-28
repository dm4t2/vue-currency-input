<template>
  <input
    v-currency="{locale, currency, distractionFree, allowNegative}"
    :value="formattedValue"
    @format="handleFormat">
</template>

<script>
import currencyDirective, { format } from './curencyDirective'

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
      if (!this.$el.dataset.focus) {
        format(this.$el, value)
      }
    }
  },
  methods: {
    handleFormat ({ detail }) {
      this.$emit('input', detail.numberValue)
      this.formattedValue = detail.formattedValue
    }
  }
}
</script>
