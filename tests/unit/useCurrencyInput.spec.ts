import { fireEvent, render } from '@testing-library/vue'
import { defineComponent, h } from 'vue'
import { useCurrencyInput } from '../../src'
import { CurrencyInput } from '../../src/currencyInput'
import { mocked } from 'ts-jest/utils'

jest.mock('../../src/currencyInput')

describe('useCurrencyInput', () => {
  it('should emit the new value on input', async () => {
    const currencyInput = render(
      defineComponent({
        setup: () => {
          const { inputRef, formattedValue } = useCurrencyInput({ currency: 'EUR' })
          // @ts-ignore
          return () => h('div', { ref: inputRef }, [h('input', { value: formattedValue })])
        }
      })
    )

    currencyInput.getByRole('textbox').dispatchEvent(new CustomEvent('input', { detail: { number: 10 } }))

    expect(currencyInput.emitted()['update:modelValue']).toEqual([[10]])
  })

  it('should emit the new value on change', async () => {
    const currencyInput = render(
      defineComponent({
        setup: () => {
          const { inputRef, formattedValue } = useCurrencyInput({ currency: 'EUR' })
          // @ts-ignore
          return () => h('div', { ref: inputRef }, [h('input', { value: formattedValue })])
        }
      })
    )

    currencyInput.getByRole('textbox').dispatchEvent(new CustomEvent('change', { detail: { number: 10 } }))

    expect(currencyInput.emitted()['change']).toEqual([[10]])
  })

  describe('error handling', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation()
    })

    it('should skip the CurrencyInput instantiation if the template ref is not present', () => {
      render(
        defineComponent({
          render: () => h('input'),
          setup: () => useCurrencyInput({ currency: 'EUR' })
        })
      )

      expect(CurrencyInput).not.toHaveBeenCalled()
      expect(console.error).toHaveBeenCalled()
    })

    it('should skip the CurrencyInput instantiation if no input element can be found', () => {
      render(
        defineComponent({
          render: () => h('div'),
          setup: () => useCurrencyInput({ currency: 'EUR' })
        })
      )

      expect(CurrencyInput).not.toHaveBeenCalled()
      expect(console.error).toHaveBeenCalled()
    })
  })

  it('should accept a input element as template ref', () => {
    const currencyInput = render(
      defineComponent({
        render: () => h('input', { ref: 'inputRef' }),
        setup: () => useCurrencyInput({ currency: 'EUR' })
      })
    )

    expect(CurrencyInput).toHaveBeenCalledWith(currencyInput.getByRole('textbox'), { currency: 'EUR' })
  })

  it('should accept custom input components as template ref', () => {
    const customInput = defineComponent({
      render: () => h('div', [h('input')])
    })
    const currencyInput = render(
      defineComponent({
        render: () => h(customInput, { ref: 'inputRef' }),
        setup: () => useCurrencyInput({ currency: 'EUR' })
      })
    )

    expect(CurrencyInput).toHaveBeenCalledWith(currencyInput.getByRole('textbox'), { currency: 'EUR' })
  })

  it('should allow to update the value', () => {
    const currencyInput = render(
      defineComponent(() => {
        const { setValue, inputRef } = useCurrencyInput({ currency: 'EUR' })
        return () =>
          // @ts-ignore
          h('div', { ref: inputRef }, [
            h('input'),
            h('button', {
              onClick: () => {
                setValue(1234)
              }
            })
          ])
      })
    )

    fireEvent.click(currencyInput.getByRole('button'))

    expect(mocked(CurrencyInput).mock.instances[0].setValue).toHaveBeenCalledWith(1234)
  })

  it('should allow to update the options', () => {
    const currencyInput = render(
      defineComponent(() => {
        const { setOptions, inputRef } = useCurrencyInput({ currency: 'EUR' })
        return () =>
          // @ts-ignore
          h('div', { ref: inputRef }, [
            h('input'),
            h('button', {
              onClick: () => {
                setOptions({ currency: 'USD' })
              }
            })
          ])
      })
    )

    fireEvent.click(currencyInput.getByRole('button'))

    expect(mocked(CurrencyInput).mock.instances[0].setOptions).toHaveBeenCalledWith({ currency: 'USD' })
  })
})
