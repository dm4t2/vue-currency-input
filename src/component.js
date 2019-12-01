import defaultOptions from './defaultOptions'
import currencyDirective from './directive'
import dispatchEvent from './utils/dispatchEvent'

export default {
  render (h) {
    return h('input', {
      domProps: {
        value: this.formattedValue
      },
      directives: [{
        name: 'currency',
        value: this.options,
        modifiers: {
          inputEvent: 'format-complete'
        }
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
    min: {
      type: Number,
      default: undefined
    },
    max: {
      type: Number,
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
      Object.keys(defaultOptions).forEach((key) => {
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
      dispatchEvent(this.$el, 'format', { value })
    },
    listeners () {
      const { input, ...listeners } = this.$listeners // all but input event
      return {
        ...listeners,
        'format-complete': ({ detail }) => {
          this.$emit('input', detail.numberValue)
          this.formattedValue = this.$el.value
        }
      }
    }
  }
}
