import { NumberInput } from './numberInput'
import { computed, getCurrentInstance, isVue3, onMounted, onUnmounted, ref } from 'vue-demi'

const findInput = (el) => el.tagName.toLowerCase() === 'input' ? el : el.querySelector('input')

export default (options) => {
  let numberInput, input
  const inputRef = ref(null)
  const formattedValue = ref(null)

  const instance = getCurrentInstance()
  const emit = (event, value) => isVue3 ? instance.emit(event, value) : instance.proxy.$emit(event, value)
  const lazyModel = isVue3 && (instance.attrs.modelModifiers || {}).lazy
  const numberValue = computed(() => isVue3 ? instance.props.modelValue : instance.props.value)
  const inputEvent = isVue3 ? 'update:modelValue' : 'input'
  const changeEvent = isVue3 && lazyModel ? 'update:modelValue' : 'change'
  const hasInputEventListener = (!!instance.attrs['onUpdate:modelValue'] && !lazyModel) || !!instance.proxy.$listeners[inputEvent]
  const hasChangeEventListener = lazyModel || !!instance.attrs.onChange || !!instance.proxy.$listeners[changeEvent]

  const onInput = (e) => {
    if (e.detail) {
      if (numberValue.value !== e.detail.number) {
        emit(inputEvent, e.detail.number)
      }
      formattedValue.value = e.detail.formatted
    }
  }

  const onChange = (e) => {
    if (e.detail) {
      emit(changeEvent, e.detail.number)
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
