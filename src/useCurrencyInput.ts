import { CurrencyInput } from './currencyInput'
import { ComponentPublicInstance, computed, ComputedRef, getCurrentInstance, isVue3, onUnmounted, Ref, ref, watch } from 'vue-demi'
import { CurrencyInputOptions, CurrencyInputValue, UseCurrencyInput } from './api'

const findInput = (el: HTMLElement | null) => (el?.matches('input') ? el : el?.querySelector('input')) as HTMLInputElement

export default (options: CurrencyInputOptions, autoEmit?: boolean): UseCurrencyInput => {
  let numberInput: CurrencyInput | null
  let input: HTMLInputElement | null
  const inputRef: Ref<HTMLInputElement | ComponentPublicInstance | null> = ref(null)
  const formattedValue = ref<string | null>(null)
  const numberValue = ref<number | null>(null)

  const instance = getCurrentInstance()
  const emit = (event: string, value: number | null) => instance?.emit(event, value)
  const lazyModel = isVue3 && (instance?.attrs.modelModifiers as Record<string, boolean>)?.lazy
  const modelValue: ComputedRef<number | null> = computed(() => instance?.props[isVue3 ? 'modelValue' : 'value'] as number)
  const inputEvent = isVue3 ? 'update:modelValue' : 'input'
  const changeEvent = lazyModel ? 'update:modelValue' : 'change'
  const hasInputEventListener = !isVue3 || !lazyModel
  const hasChangeEventListener = !isVue3 || lazyModel || !instance?.attrs.onChange

  const onInput = (e: CustomEvent<CurrencyInputValue>) => {
    if (e.detail) {
      if (autoEmit !== false && modelValue.value !== e.detail.number) {
        emit(inputEvent, e.detail.number)
      }
      numberValue.value = e.detail.number
      formattedValue.value = e.detail.formatted
    }
  }

  const onChange = (e: CustomEvent<CurrencyInputValue>) => {
    if (e.detail) {
      if (autoEmit !== false) {
        emit(changeEvent, e.detail.number)
      }
      numberValue.value = e.detail.number
      formattedValue.value = e.detail.formatted
    }
  }

  watch(inputRef, (value) => {
    if (value) {
      input = findInput((value as ComponentPublicInstance)?.$el ?? value)
      if (input) {
        numberInput = new CurrencyInput(input, options)
        if (hasInputEventListener) {
          input.addEventListener('input', onInput as EventListener)
        }
        if (hasChangeEventListener) {
          input.addEventListener('change', onChange as EventListener)
        }
        numberInput.setValue(modelValue.value)
      } else {
        console.error('No input element found. Please make sure that the "inputRef" template ref is properly assigned.')
      }
    } else {
      numberInput = null
    }
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
    numberValue,
    formattedValue,
    setValue: (value: number | null) => numberInput?.setValue(value),
    setOptions: (options: CurrencyInputOptions) => numberInput?.setOptions(options)
  }
}
