// @vitest-environment jsdom
/* eslint-disable vue/one-component-per-file */
import { defineComponent, h, nextTick, ref, VNode } from 'vue'
import { useCurrencyInput } from '../../src'
import { mount, shallowMount } from '@vue/test-utils'
import { CurrencyInput } from '../../src/currencyInput'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../../src/currencyInput')

const mountComponent = (
  { type, children } = <
    {
      type: string
      children?: VNode[]
      autoEmit?: boolean
    }
  >{
    type: 'div',
    children: [h('input')]
  }
) =>
  shallowMount(
    defineComponent({
      setup: () => {
        const { inputRef } = useCurrencyInput({ currency: 'EUR' })
        return () => h(type, { ref: inputRef }, children)
      }
    })
  )

describe('useCurrencyInput', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should skip the CurrencyInput instantiation if no input element can be found', async () => {
    vi.spyOn(console, 'error')
    vi.clearAllMocks()
    mountComponent({ type: 'div' })
    await nextTick()

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
    await nextTick()
    expect(CurrencyInput).toHaveBeenCalledWith(expect.objectContaining({ el: wrapper.find('input').element }))
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
    await nextTick()

    expect(CurrencyInput).toHaveBeenCalledWith(expect.objectContaining({ el: currencyInput.find('input').element }))
  })

  it('should allow to update the value', async () => {
    const wrapper = shallowMount(
      defineComponent(() => {
        const numberValue = ref('123')
        const { inputRef } = useCurrencyInput({ currency: 'EUR' }, numberValue)
        return () =>
          h('div', { ref: inputRef }, [
            h('input'),
            h('button', {
              onClick: () => {
                numberValue.value = '1234'
              }
            })
          ])
      })
    )

    await wrapper.find('button').trigger('click')

    expect(vi.mocked(CurrencyInput).mock.instances[0].setValue).toHaveBeenCalledWith('1234')
  })

  it('should allow to update the options', async () => {
    const wrapper = shallowMount(
      defineComponent(() => {
        const options = ref({ currency: 'EUR' })
        const { inputRef } = useCurrencyInput(options)
        return () =>
          h('div', { ref: inputRef }, [
            h('input'),
            h('button', {
              onClick: () => {
                options.value = { currency: 'USD' }
              }
            })
          ])
      })
    )
    await nextTick()

    await wrapper.find('button').trigger('click')

    expect(vi.mocked(CurrencyInput).mock.instances[0].setOptions).toHaveBeenCalledWith({ currency: 'USD' })
  })

  it('should support a conditionally rendered inputRef', async () => {
    const wrapper = shallowMount(
      defineComponent(() => {
        const { inputRef } = useCurrencyInput({ currency: 'EUR' })
        const visible = ref(true)
        return () =>
          h('div', [
            visible.value ? h('input', { ref: inputRef }) : h('div'),
            h('button', {
              onClick: () => {
                visible.value = !visible.value
              }
            })
          ])
      })
    )
    await nextTick()
    expect(CurrencyInput).toHaveBeenCalled()

    vi.mocked(CurrencyInput).mockClear()
    await wrapper.find('button').trigger('click')
    expect(CurrencyInput).not.toHaveBeenCalled()

    await wrapper.find('button').trigger('click')
    expect(CurrencyInput).toHaveBeenCalled()
  })
})
