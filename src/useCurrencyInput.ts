import { CurrencyInput } from './currencyInput'
import { computed, ComputedRef, getCurrentInstance, isVue3, onMounted, onUnmounted, Ref, ref } from 'vue-demi'
import { CurrencyInputOptions, CurrencyInputValue, UseCurrencyInput } from './api'

const findInput = (el: HTMLElement | null) => (el?.matches('input') ? el : el?.querySelector('input'))

export default (options: CurrencyInputOptions): UseCurrencyInput => {
  let numberInput: CurrencyInput | null
  let input: HTMLInputElement | null
  const inputRef: Ref<HTMLInputElement | null> = ref(null)
  const formattedValue = ref<string | null>(null)

  const instance = getCurrentInstance()
  if (instance == null) {
    throw new Error()
  }
  const emit = (event: string, value: number | null) => (isVue3 ? instance.emit(event, value) : instance.proxy?.$emit(event, value))
  // @ts-ignore
  const lazyModel = isVue3 && instance.attrs.modelModifiers?.lazy
  const numberValue: ComputedRef<number | null> = computed(() => (isVue3 ? instance.props.modelValue : instance.props.value) as number)
  const inputEvent = isVue3 ? 'update:modelValue' : 'input'
  const changeEvent = isVue3 && lazyModel ? 'update:modelValue' : 'change'
  // @ts-ignore
  const hasInputEventListener = isVue3 ? !!instance.attrs['onUpdate:modelValue'] && !lazyModel : !!instance.proxy?.$listeners[inputEvent]
  // @ts-ignore
  const hasChangeEventListener = isVue3 ? lazyModel || !!instance.attrs.onChange : !!instance.proxy.$listeners[changeEvent]

  const onInput = (e: CustomEvent<CurrencyInputValue>) => {
    if (e.detail) {
      if (numberValue.value !== e.detail.number) {
        emit(inputEvent, e.detail.number)
      }
      formattedValue.value = e.detail.formatted
    }
  }

  const onChange = (e: CustomEvent<CurrencyInputValue>) => {
    if (e.detail) {
      emit(changeEvent, e.detail.number)
      formattedValue.value = e.detail.formatted
    }
  }

  onMounted(() => {
    // @ts-ignore
    input = findInput(inputRef.value?.$el ?? inputRef.value)
    if (!input) {
      throw new Error('No input element found')
    }
    numberInput = new CurrencyInput(input, options)
    if (hasInputEventListener) {
      input.addEventListener('input', onInput as EventListener)
    }
    if (hasChangeEventListener) {
      input.addEventListener('change', onChange as EventListener)
    }
    numberInput.setValue(numberValue.value)
  })

  onUnmounted(() => {
    if (hasInputEventListener) {
      input?.removeEventListener('input', onInput as EventListener)
    }
    if (hasChangeEventListener) {
      input?.removeEventListener('change', onChange as EventListener)
    }
  })

  return {
    inputRef,
    formattedValue,
    setValue: (value: number | null) => numberInput?.setValue(value),
    setOptions: (options: CurrencyInputOptions) => numberInput?.setOptions(options)
  }
}
