import { NumberInput } from './numberInput'
import { computed, getCurrentInstance, isVue3, onMounted, onUnmounted, ref } from 'vue-demi'

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
  const hasInputEventListener = !!(isVue3 ? currentInstance.attrs['onUpdate:modelValue'] : currentInstance.$listeners[inputEvent])
  const hasChangeEventListener = !!(isVue3 ? currentInstance.attrs['onUpdate:modelValue'] : currentInstance.$listeners[changeEvent])

  const onInput = (e) => {
    if (e.detail && !lazy && numberValue.value !== e.detail.number) {
      currentInstance[isVue3 ? 'emit' : '$emit'](inputEvent, e.detail.number)
      formattedValue.value = e.detail.formatted
    }
  }

  const onChange = (e) => {
    if (e.detail) {
      currentInstance[isVue3 ? 'emit' : '$emit'](changeEvent, e.detail.number)
      formattedValue.value = e.detail.formatted
    }
  }

  onMounted(() => {
    input = '$el' in inputRef.value ? findInput(inputRef.value.$el) : inputRef.value

    if (input == null) {
      throw new Error('No input element found')
    } else {
      numberInput = new NumberInput(input, options)
      if (hasInputEventListener) {
        input.addEventListener('input', onInput)
      }
      if (hasChangeEventListener) {
        input.addEventListener('change', onChange)
      }
      numberInput.setValue(numberValue.value)
    }
  })

  onUnmounted(() => {
    if (hasInputEventListener) {
      input.removeEventListener('input', onInput)
    }
    if (hasChangeEventListener) {
      input.removeEventListener('change', onChange)
    }
  })

  return {
    inputRef,
    formattedValue,
    setValue: (value) => numberInput.setValue(value),
    setOptions: (options) => numberInput.setOptions(options)
  }
}
