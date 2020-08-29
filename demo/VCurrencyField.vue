<template>
  <VTextField
    ref="input"
    v-currency="options"
    :value="formattedValue"
    dense
    hide-details
    outlined
    @change="onChange"
    @input="onInput"
  />
</template>

<script>
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
      formattedValue: null
    }
  },
  watch: {
    value (value) {
      this.setValue(value)
    }
  },
  mounted () {
    this.setValue(this.value)
  },
  methods: {
    setValue (value) {
      this.$ci.setValue(this.$refs.input, value)
    },
    onInput (value) {
      this.$emit('input', this.$ci.getValue(this.$refs.input))
      this.formattedValue = value
    },
    onChange (value) {
      this.$emit('change', this.$ci.getValue(this.$refs.input))
      this.formattedValue = value
    }
  }
}
</script>
