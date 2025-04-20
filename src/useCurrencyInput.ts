import { CurrencyInput } from './currencyInput'
import { ComponentPublicInstance, isRef, Ref, ref, unref, watch } from 'vue'
import { CurrencyInputOptions } from './api'

const findInput = (el: HTMLElement | null) => (el?.matches('input') ? el : el?.querySelector('input')) as HTMLInputElement | null

export function useCurrencyInput({
  options,
  modelValue,
  lazy
}: {
  options: CurrencyInputOptions | Ref<CurrencyInputOptions>
  modelValue?: Ref<number | string | null>
  lazy?: boolean
}) {
  let currencyInput: CurrencyInput | null
  const inputRef: Ref<HTMLInputElement | ComponentPublicInstance | null> = ref(null)
  const formattedValue = ref<string | null>(null)
  if (isRef(options)) {
    watch(options, (newOptions) => {
      currencyInput?.setOptions(newOptions)
    })
  }

  if (modelValue !== undefined) {
    watch(modelValue, (value) => {
      currencyInput?.setValue(value)
    })
  }

  function emit(value: string | null) {
    if (modelValue !== undefined) {
      modelValue.value = value
    }
  }

  watch(inputRef, (value) => {
    if (value) {
      const el = findInput((value as ComponentPublicInstance)?.$el ?? value)
      if (el) {
        currencyInput = new CurrencyInput({
          el,
          options: unref(options),
          onInput: (value: string | null) => {
            formattedValue.value = el.value
            if (!lazy) {
              emit(value)
            }
          },
          onChange: (value: string | null) => {
            if (lazy) {
              emit(value)
            }
          }
        })
        if (modelValue !== undefined) {
          currencyInput.setValue(modelValue.value)
        }
      } else {
        console.error('No input element found. Please make sure that the "inputRef" template ref is properly assigned.')
      }
    } else {
      currencyInput = null
    }
  })

  return {
    inputRef,
    formattedValue
  }
}
