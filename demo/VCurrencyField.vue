<template>
  <VTextField
    @input="$emit('input', $ci.getValue(inputRef))"
    hide-details
    outlined
    ref="textField"
    v-currency="options"
  />
</template>

<script>
import { setValue } from '../src/api'

export default {
  name: 'VCurrencyField',
  props: {
    value: {
      type: Number,
      default: null
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      inputRef: null
    }
  },
  watch: {
    value (value) {
      setValue(this.inputRef, value)
    }
  },
  mounted () {
    this.inputRef = this.$refs.textField.$refs.input
    setValue(this.inputRef, this.value)
  }
}
</script>
