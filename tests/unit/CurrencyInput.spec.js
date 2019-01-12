import { shallowMount } from '@vue/test-utils'
import CurrencyInput from '../../src/components/CurrencyInput'

describe('CurrencyInput', () => {
  let wrapper, propsData
  beforeEach(() => {
    propsData = {
      currency: 'EUR',
      locale: 'en'
    }
    wrapper = mountComponent(propsData)
  })

  it('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  describe('props', () => {
    describe('value', () => {
      it('is of type Number', () => {
        expect(wrapper.vm.$options.props.value.type).toBe(Number)
      })

      it('defaults to null', () => {
        expect(wrapper.vm.$options.props.value.default).toBeNull()
      })
    })

    describe('currency', () => {
      it('is of type String', () => {
        expect(wrapper.vm.$options.props.currency.type).toBe(String)
      })

      it('is required', () => {
        expect(wrapper.vm.$options.props.currency.required).toBe(true)
      })
    })

    describe('locale', () => {
      it('is of type String', () => {
        expect(wrapper.vm.$options.props.locale.type).toBe(String)
      })

      it('defaults to undefined', () => {
        expect(wrapper.vm.$options.props.locale.required).toBe(undefined)
      })
    })

    describe('distractionFree', () => {
      it('is of type Boolean', () => {
        expect(wrapper.vm.$options.props.distractionFree.type).toBe(Boolean)
      })

      it('defaults to true', () => {
        expect(wrapper.vm.$options.props.distractionFree.default).toBe(true)
      })
    })

    describe('allowNegative', () => {
      it('is of type Boolean', () => {
        expect(wrapper.vm.$options.props.allowNegative.type).toBe(Boolean)
      })

      it('defaults to true', () => {
        expect(wrapper.vm.$options.props.allowNegative.default).toBe(true)
      })
    })
  })

  describe('when the component is mounted', () => {
    it('applies the fixed fraction format to the initial value', () => {
      const applyFixedFractionFormat = jest.fn()
      shallowMount(CurrencyInput, {
        propsData,
        methods: { applyFixedFractionFormat }
      })
      expect(applyFixedFractionFormat).toHaveBeenCalled()
    })
  })

  describe('currency format config', () => {
    let format
    beforeEach(() => {
      format = jest.fn()
      wrapper = shallowMount(CurrencyInput, {
        propsData,
        computed: {
          currencyFormat: jest.fn(() => ({ format }))
        }
      })
    })

    describe('when the format has a prefix', () => {
      it('builds the config correctly', () => {
        format.mockReturnValue('€ 1,234.00')

        expect(wrapper.vm.config).toMatchSnapshot()
      })
    })

    describe('when the format has a suffix', () => {
      it('builds the config correctly', () => {
        format.mockReturnValue('1.234,00 €')

        expect(wrapper.vm.config).toMatchSnapshot()
      })
    })
  })

  describe('when the input is changed', () => {
    it('formats the value correctly', () => {
      wrapper.element.value = '1234'

      wrapper.trigger('input')

      expect(wrapper.vm.formattedValue).toBe('€1,234')
    })

    it('emits the raw number value', () => {
      wrapper.element.value = '€1,234.5'

      wrapper.trigger('input')

      expect(wrapper.emitted('input')[0][0]).toBe(1234.5)
    })

    describe('when the input is cleared', () => {
      it('emits a null value', () => {
        wrapper.element.value = ''

        wrapper.trigger('input')

        expect(wrapper.emitted('input')[0][0]).toBeNull()
      })
    })
  })

  describe('when the input is focused', () => {
    describe('distraction free mode is enabled', () => {
      it('applies the distraction free format', async () => {
        wrapper.setProps({ value: 1234.5, distractionFree: true })

        wrapper.trigger('focus')
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.formattedValue).toBe('1,234.5')
      })

      it('sets the caret position correctly', async () => {
        wrapper.setProps({ value: 1234.5, distractionFree: true })
        jest.spyOn(wrapper.vm, 'setCaretPosition')

        wrapper.element.setSelectionRange(1, 1)
        wrapper.trigger('focus')
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.setCaretPosition).toHaveBeenCalledWith(0)
      })
    })

    describe('distraction free mode is disabled', () => {
      it('leaves the current value untouched', async () => {
        wrapper.setProps({ value: 1234.5, distractionFree: false })

        wrapper.trigger('focus')
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.formattedValue).toBe('€1,234.50')
      })

      it('leaves the caret position untouched', async () => {
        wrapper.setProps({ value: 1234.5, distractionFree: false })
        jest.spyOn(wrapper.vm, 'setCaretPosition')

        wrapper.element.setSelectionRange(3, 3)
        wrapper.trigger('focus')
        await wrapper.vm.$nextTick()

        expect(wrapper.element.selectionStart).toBe(3)
      })
    })
  })

  describe('when the input is blurred', () => {
    it('applies the fixed fraction format', () => {
      wrapper.setProps({ value: 1234.5 })

      wrapper.trigger('blur')

      expect(wrapper.vm.formattedValue).toBe('€1,234.50')
    })
  })
})

const mountComponent = (propsData) => {
  return shallowMount(CurrencyInput, { propsData })
}
