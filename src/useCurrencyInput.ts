import { CurrencyInput } from './currencyInput'
import { ComponentPublicInstance, isRef, Ref, ref, unref, watch } from 'vue'
import { CurrencyInputOptions } from './api'

const findInput = (el: HTMLElement | null) => (el?.matches('input') ? el : el?.querySelector('input')) as HTMLInputElement

export function useCurrencyInput(
  currencyInputOptions: CurrencyInputOptions | Ref<CurrencyInputOptions>,
  initialValue?: string | number,
  lazy?: boolean
): {
  formattedValue: Ref<string | null>
  numberValue: Ref<string | null>
  inputRef: Ref<HTMLInputElement | ComponentPublicInstance | null>
} {
  let currencyInput: CurrencyInput | null
  const inputRef: Ref<HTMLInputElement | ComponentPublicInstance | null> = ref(null)
  const formattedValue = ref<string | null>(null)
  const numberValue = ref<string | null>(null)

  if (isRef(currencyInputOptions)) {
    watch(currencyInputOptions, (newOptions) => {
      currencyInput?.setOptions(newOptions)
    })
  }

  watch(numberValue, (value) => {
    currencyInput?.setValue(value)
  })

  watch(inputRef, (value) => {
    if (value) {
      const el = findInput((value as ComponentPublicInstance)?.$el ?? value)
      if (el) {
        currencyInput = new CurrencyInput({
          el,
          options: unref(currencyInputOptions),
          onInput: (value: string | null) => {
            formattedValue.value = el.value
            if (!lazy) {
              numberValue.value = value
            }
          },
          onChange: (value: string | null) => {
            if (lazy) {
              numberValue.value = value
            }
          }
        })
        if (initialValue !== undefined) {
          currencyInput.setValue(initialValue)
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
    formattedValue,
    numberValue
  }
}
