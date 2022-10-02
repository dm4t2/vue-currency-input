import { CurrencyInput } from './currencyInput'
import { ComponentPublicInstance, computed, ComputedRef, getCurrentInstance, Ref, ref, version, watch } from 'vue'
import { CurrencyInputOptions, CurrencyInputValue, UseCurrencyInput } from './api'

const findInput = (el: HTMLElement | null) => (el?.matches('input') ? el : el?.querySelector('input')) as HTMLInputElement

export function useCurrencyInput(options: CurrencyInputOptions, autoEmit?: boolean): UseCurrencyInput {
  let currencyInput: CurrencyInput | null
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

  watch(inputRef, (value) => {
    if (value) {
      const el = findInput((value as ComponentPublicInstance)?.$el ?? value)
      if (el) {
        currencyInput = new CurrencyInput({
          el,
          options,
          onInput: (value: CurrencyInputValue) => {
            if (!lazyModel && autoEmit !== false && modelValue.value !== value.number) {
              emit?.(inputEvent, value.number)
            }
            numberValue.value = value.number
            formattedValue.value = value.formatted
          },
          onChange: (value: CurrencyInputValue) => {
            emit?.(changeEvent, value.number)
          }
        })
        currencyInput.setValue(modelValue.value)
      } else {
        console.error('No input element found. Please make sure that the "inputRef" template ref is properly assigned.')
      }
    } else {
      currencyInput = null
    }
  })

  return {
    inputRef,
    numberValue,
    formattedValue,
    setValue: (value: number | null) => currencyInput?.setValue(value),
    setOptions: (options: CurrencyInputOptions) => currencyInput?.setOptions(options)
  }
}
