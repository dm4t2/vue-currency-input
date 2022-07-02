import { CurrencyInput } from './currencyInput'
import { ComponentPublicInstance, computed, ComputedRef, getCurrentInstance, onUnmounted, Ref, ref, watch, version } from 'vue'
import { CurrencyInputOptions, CurrencyInputValue, UseCurrencyInput } from './api'

const findInput = (el: HTMLElement | null) => (el?.matches('input') ? el : el?.querySelector('input')) as HTMLInputElement

export default (options: CurrencyInputOptions, autoEmit?: boolean): UseCurrencyInput => {
  let numberInput: CurrencyInput | null
  let input: HTMLInputElement | null
  const inputRef: Ref<HTMLInputElement | ComponentPublicInstance | null> = ref(null)
  const formattedValue = ref<string | null>(null)
  const numberValue = ref<number | null>(null)

  const vm = getCurrentInstance()
  const emit = vm?.emit || vm?.proxy?.$emit?.bind(vm?.proxy)
  const props = (vm?.props || vm?.proxy?.$props) as Record<string, unknown>
  const isVue3 = version.startsWith('3')
  const lazyModel = isVue3 && (vm?.attrs.modelModifiers as Record<string, boolean>)?.lazy
  const modelValue: ComputedRef<number | null> = computed(() => props?.[isVue3 ? 'modelValue' : 'value'] as number)
  const inputEvent = isVue3 ? 'update:modelValue' : 'input'
  const changeEvent = lazyModel ? 'update:modelValue' : 'change'

  const onInput = (e: CustomEvent<CurrencyInputValue>) => {
    if (e.detail) {
      if (!lazyModel && autoEmit !== false && modelValue.value !== e.detail.number) {
        emit?.(inputEvent, e.detail.number)
      }
      numberValue.value = e.detail.number
      formattedValue.value = e.detail.formatted
    }
  }

  const onChange = (e: CustomEvent<CurrencyInputValue>) => {
    if (e.detail) {
      emit?.(changeEvent, e.detail.number)
    }
  }

  watch(inputRef, (value) => {
    if (value) {
      input = findInput((value as ComponentPublicInstance)?.$el ?? value)
      if (input) {
        input.addEventListener('input', onInput as EventListener)
        input.addEventListener('change', onChange as EventListener)
        numberInput = new CurrencyInput(input, options)
        numberInput.setValue(modelValue.value)
      } else {
        console.error('No input element found. Please make sure that the "inputRef" template ref is properly assigned.')
      }
    } else {
      numberInput = null
    }
  })

  onUnmounted(() => {
    input?.removeEventListener('input', onInput as EventListener)
    input?.removeEventListener('change', onChange as EventListener)
  })

  return {
    inputRef,
    numberValue,
    formattedValue,
    setValue: (value: number | null) => numberInput?.setValue(value),
    setOptions: (options: CurrencyInputOptions) => numberInput?.setOptions(options)
  }
}
