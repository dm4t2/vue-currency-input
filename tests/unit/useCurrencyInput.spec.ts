/* eslint-disable vue/one-component-per-file */
import { defineComponent, h } from 'vue'
import { useCurrencyInput } from '../../src'
import { mount, shallowMount } from '@vue/test-utils'
import { CurrencyInput } from '../../src/currencyInput'
import { mocked } from 'ts-jest/utils'

jest.mock('../../src/currencyInput')

describe('useCurrencyInput', () => {
  it('should emit the new value on input', async () => {
    const wrapper = shallowMount(
      defineComponent({
        setup: () => {
          const { inputRef, formattedValue } = useCurrencyInput({ currency: 'EUR' })
          return () => h('div', { ref: inputRef }, [h('input', { value: formattedValue })])
        }
      })
    )

    await wrapper.vm.$nextTick()
    wrapper.find('input').element.dispatchEvent(new CustomEvent('input', { detail: { number: 10 } }))

    expect(wrapper.emitted('update:modelValue')).toEqual([[10]])
  })

  it('should emit the new value on change', async () => {
    const wrapper = shallowMount(
      defineComponent({
        setup: () => {
          const { inputRef, formattedValue } = useCurrencyInput({ currency: 'EUR' })
          return () => h('div', { ref: inputRef }, [h('input', { value: formattedValue })])
        }
      })
    )

    await wrapper.vm.$nextTick()
    wrapper.find('input').element.dispatchEvent(new CustomEvent('change', { detail: { number: 10 } }))

    expect(wrapper.emitted('change')).toEqual([[10]])
  })

  it('should skip the CurrencyInput instantiation if no input element can be found', async () => {
    jest.spyOn(console, 'error').mockImplementation()
    const wrapper = shallowMount(
      defineComponent({
        setup: () => {
          const { inputRef } = useCurrencyInput({ currency: 'EUR' })
          return () => h('div', { ref: inputRef }, [h('div')])
        }
      })
    )
    await wrapper.vm.$nextTick()

    expect(CurrencyInput).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalled()
  })

  it('should accept a input element as template ref', async () => {
    const wrapper = shallowMount(
      defineComponent({
        setup: () => useCurrencyInput({ currency: 'EUR' }),
        render: () => h('input', { ref: 'inputRef' })
      })
    )
    await wrapper.vm.$nextTick()

    expect(CurrencyInput).toHaveBeenCalledWith(wrapper.find('input').element, { currency: 'EUR' })
  })

  it('should accept custom input components as template ref', async () => {
    const wrapper = defineComponent({
      render: () => h('div', [h('input')])
    })
    const currencyInput = mount(
      defineComponent({
        setup: () => useCurrencyInput({ currency: 'EUR' }),
        render: () => h(wrapper, { ref: 'inputRef' })
      })
    )
    await currencyInput.vm.$nextTick()

    expect(CurrencyInput).toHaveBeenCalledWith(currencyInput.find('input').element, { currency: 'EUR' })
  })

  it('should allow to update the value', async () => {
    const wrapper = shallowMount(
      defineComponent(() => {
        const { setValue, inputRef } = useCurrencyInput({ currency: 'EUR' })
        return () =>
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
    await wrapper.vm.$nextTick()

    wrapper.find('button').trigger('click')

    expect(mocked(CurrencyInput).mock.instances[0].setValue).toHaveBeenCalledWith(1234)
  })

  it('should allow to update the options', async () => {
    const wrapper = shallowMount(
      defineComponent(() => {
        const { setOptions, inputRef } = useCurrencyInput({ currency: 'EUR' })
        return () =>
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
    await wrapper.vm.$nextTick()

    wrapper.find('button').trigger('click')

    expect(mocked(CurrencyInput).mock.instances[0].setOptions).toHaveBeenCalledWith({ currency: 'USD' })
  })
})
