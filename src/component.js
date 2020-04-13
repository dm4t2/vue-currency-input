import { DEFAULT_OPTIONS, setValue } from './api'
import currencyDirective from './directive'
import createCurrencyFormat from './utils/createCurrencyFormat'

export default {
  render (h) {
    return h('input', {
      domProps: {
        value: this.formattedValue
      },
      directives: [{
        name: 'currency',
        value: this.options
      }],
      on: {
        ...this.$listeners,
        change: e => {
          if (e.detail) {
            this.$emit('change', e.detail.numberValue)
          }
          this.formattedValue = this.$el.value
        },
        input: e => {
          if (e.detail && this.value !== e.detail.numberValue) {
            this.$emit('input', e.detail.numberValue)
          }
          this.formattedValue = this.$el.value
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
  data () {
    return {
      formattedValue: null
    }
  },
  created () {
    const { minimumFractionDigits, maximumFractionDigits } = createCurrencyFormat(this.options)
    this.formattedValue = this.value != null ? this.value.toLocaleString(this.locale, { minimumFractionDigits, maximumFractionDigits }) : null
  },
  computed: {
    options () {
      const options = { ...this.$CI_DEFAULT_OPTIONS || DEFAULT_OPTIONS }
      Object.keys(DEFAULT_OPTIONS).forEach(key => {
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
