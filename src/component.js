import { DEFAULT_OPTIONS, setValue } from './api'
import currencyDirective from './directive'

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
      on: this.listeners()
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
      formattedValue: this.value
    }
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
    },
    listeners () {
      const { input, ...listeners } = this.$listeners // all but input event
      return {
        ...listeners,
        change: ({ detail }) => {
          if (detail) {
            this.$emit('change', detail.numberValue)
          }
          this.formattedValue = this.$el.value
        },
        'format-complete': ({ detail }) => {
          if (this.value !== detail.numberValue) {
            this.$emit('input', detail.numberValue)
          }
          this.formattedValue = this.$el.value
        }
      }
    }
  }
}
