import { CurrencyInput } from './currencyInput'
import { ComponentPublicInstance, Ref, ref, watch } from 'vue'
import { CurrencyInputOptions, UseCurrencyInputOptions } from './api'

const findInput = (el: HTMLElement | null) => (el?.matches('input') ? el : el?.querySelector('input')) as HTMLInputElement

export default (
  options: UseCurrencyInputOptions
): {
  inputRef: Ref<HTMLInputElement | ComponentPublicInstance | null>
  setValue: (value: number | string | null) => void | undefined
  setOptions: (options: CurrencyInputOptions) => void | undefined
  getNumberValue: () => number | null
} => {
  let currencyInput: CurrencyInput | null
  let input: HTMLInputElement | null
  const inputRef: Ref<HTMLInputElement | ComponentPublicInstance | null> = ref(null)

  watch(inputRef, (value) => {
    if (value) {
      input = findInput((value as ComponentPublicInstance)?.$el ?? value)
      if (input) {
        currencyInput = new CurrencyInput({
          el: input,
          options: options.options,
          onInput: options.onInput,
          onChange: options.onChange
        })
      } else {
        console.error('No input element found. Please make sure that the "inputRef" template ref is properly assigned.')
      }
    } else {
      currencyInput = null
    }
  })

  return {
    inputRef,
    getNumberValue: () => currencyInput?.getNumberValue() ?? null,
    setValue: (value: number | string | null) => currencyInput?.setValue(value),
    setOptions: (options: CurrencyInputOptions) => currencyInput?.setOptions(options)
  }
}
