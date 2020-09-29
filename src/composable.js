import { DEFAULT_OPTIONS, NumberInput } from './numberInput'
import { computed, getCurrentInstance, isVue3, onMounted, ref, watch } from 'vue-demi'

const findInput = (el) => el.tagName.toLowerCase() === 'input' ? el : el.querySelector('input')

export default ({ inputRef, props, emit }) => {
  let numberInput

  const currentInstance = getCurrentInstance()
  const lazy = isVue3 && (currentInstance.attrs.modelModifiers || {}).lazy
  const inputEvent = isVue3 ? 'update:modelValue' : 'input'
  const changeEvent = isVue3 ? 'update:modelValue' : 'change'
  const formattedValue = ref(null)
  const numberValue = computed(() => props[isVue3 ? 'modelValue' : 'value'])
  const options = computed(() => Object.keys(DEFAULT_OPTIONS).reduce((options, key) => {
    if (props[key] !== undefined) {
      options[key] = props[key]
    }
    return options
  }, {}))

  onMounted(() => {
    if (inputRef.value) {
      const input = '$el' in inputRef.value ? findInput(inputRef.value.$el) : inputRef.value

      if (input == null) {
        throw new Error('No input element found')
      } else {
        numberInput = new NumberInput(input, options.value, {
          onInput (value) {
            if (!lazy && numberValue.value !== value.number) {
              emit(inputEvent, value.number)
            }
            formattedValue.value = value.formatted
          },
          onChange (value) {
            emit(changeEvent, value.number)
            formattedValue.value = value.formatted
          }
        })
        numberInput.setValue(numberValue.value)
      }
    }
  })

  watch(numberValue, (value) => {
    numberInput.setValue(value)
  })

  watch(options, (options) => {
    numberInput.setOptions(options)
  })

  return { formattedValue }
}
