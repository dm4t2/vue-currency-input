<template>
  <input
    v-currency="options"
    :value="formattedValue"
    v-on="listeners()">
</template>

<script>
import currencyDirective from './currencyDirective'
import defaultOptions from './defaultOptions'

export default {
  name: 'CurrencyInput',
  directives: {
    currency: currencyDirective
  },
  model: {
    event: 'value-change'
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
    listeners () {
      return {
        ...this.$listeners,
        'value-change': ({ target: el }) => {
          this.$emit('value-change', el.$ci.numberValue)
          this.formattedValue = el.value
        }
      }
    }
  }
}
</script>
