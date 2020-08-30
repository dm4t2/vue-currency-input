import { DEFAULT_OPTIONS, getValue, setValue } from './api'
import currencyDirective from './directive'

export default {
  render (h) {
    return h('input', {
      directives: [{
        name: 'currency',
        value: this.options
      }],
      on: {
        ...this.$listeners,
        change: () => {
          this.$emit('change', getValue(this.$el))
        },
        input: () => {
          const numberValue = getValue(this.$el)
          if (this.value !== numberValue) {
            this.$emit('input', numberValue)
          }
        }
      }
    })
  },
  directives: {
    currency: currencyDirective
  },
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
      type: [String, Object],
      default: undefined
    },
    distractionFree: {
      type: [Boolean, Object],
      default: undefined
    },
    precision: {
      type: [Number, Object],
      default: undefined
    },
    autoDecimalMode: {
      type: Boolean,
      default: undefined
    },
    valueAsInteger: {
      type: Boolean,
      default: undefined
    },
    valueRange: {
      type: Object,
      default: undefined
    },
    allowNegative: {
      type: Boolean,
      default: undefined
    }
  },
  mounted () {
    this.setValue(this.value)
  },
  computed: {
    options () {
      const options = {
        ...DEFAULT_OPTIONS,
        ...(this.$ci || {}).globalOptions
      }
      Object.keys(DEFAULT_OPTIONS).forEach((key) => {
        if (this[key] !== undefined) {
          options[key] = this[key]
        }
      })
      return options
    }
  },
  watch: {
    value: 'setValue'
  },
  methods: {
    setValue (value) {
      setValue(this.$el, value)
    }
  }
}
