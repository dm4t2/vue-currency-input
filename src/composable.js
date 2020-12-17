import { NumberInput } from './numberInput'
import { computed, getCurrentInstance, isVue3, onMounted, ref } from 'vue-demi'

const findInput = (el) => el.tagName.toLowerCase() === 'input' ? el : el.querySelector('input')

export default (options) => {
  let numberInput, input
  const inputEvent = isVue3 ? 'update:modelValue' : 'input'
  const changeEvent = isVue3 ? 'update:modelValue' : 'change'
  const inputRef = ref(null)
  const formattedValue = ref(null)

  const currentInstance = getCurrentInstance()
  const lazy = isVue3 && (currentInstance.attrs.modelModifiers || {}).lazy
  const numberValue = computed(() => isVue3 ? currentInstance.props.modelValue : currentInstance.value)

  onMounted(() => {
    input = '$el' in inputRef.value ? findInput(inputRef.value.$el) : inputRef.value

    if (input == null) {
      throw new Error('No input element found')
    } else {
      numberInput = new NumberInput(input, options, {
        onInput (value) {
          if (!lazy && numberValue.value !== value.number) {
            currentInstance[isVue3 ? 'emit' : '$emit'](inputEvent, value.number)
          }
          formattedValue.value = value.formatted
        },
        onChange (value) {
          currentInstance[isVue3 ? 'emit' : '$emit'](changeEvent, value.number)
          formattedValue.value = value.formatted
        }
      })
      numberInput.setValue(numberValue.value)
    }
  })

  return {
    inputRef,
    formattedValue,
    setValue: (value) => numberInput.setValue(value),
    setOptions: (options) => numberInput.setOptions(options)
  }
}
