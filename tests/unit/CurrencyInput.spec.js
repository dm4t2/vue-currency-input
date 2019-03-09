import { shallowMount } from '@vue/test-utils'
import CurrencyInput from '../../src/CurrencyInput'

// eslint-disable-next-line no-global-assign
Intl = require('Intl')

jest.useFakeTimers()

describe('CurrencyInput', () => {
  let wrapper, propsData
  beforeEach(() => {
    propsData = {
      currency: 'EUR',
      locale: 'en',
      value: 1234.5
    }
    wrapper = mountComponent(propsData)
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

    describe('min', () => {
      it('is of type Number', () => {
        expect(wrapper.vm.$options.props.min.type).toBe(Number)
      })

      it('defaults to null', () => {
        expect(wrapper.vm.$options.props.min.default).toBeNull()
      })
    })

    describe('max', () => {
      it('is of type Number', () => {
        expect(wrapper.vm.$options.props.max.type).toBe(Number)
      })

      it('defaults to null', () => {
        expect(wrapper.vm.$options.props.max.default).toBeNull()
      })
    })
  })

  describe('when the component is mounted', () => {
    it('applies the fixed fraction format to the initial value', () => {
      expect(wrapper.element.value).toBe('€1,234.50')
    })

    describe('the initial value is less than the min value', () => {
      it('sets the min value', () => {
        wrapper = mountComponent({ ...propsData, value: 100, min: 1000 })

        expect(wrapper.element.value).toBe('€1,000.00')
      })
    })

    describe('the initial value is larger than the max value', () => {
      it('sets the max value', () => {
        wrapper = mountComponent({ ...propsData, value: 1500, max: 1000 })

        expect(wrapper.element.value).toBe('€1,000.00')
      })
    })

    describe('the configured number range is invalid', () => {
      it('ignores the number range', () => {
        wrapper = mountComponent({ ...propsData, min: 500, max: 400 })

        expect(wrapper.element.value).toBe('€1,234.50')
      })
    })
  })

  describe('when the input is changed by the user', () => {
    it('formats the value correctly', () => {
      wrapper.element.value = '12345'

      wrapper.trigger('input')

      expect(wrapper.element.value).toBe('€12,345')
    })

    it('emits the raw number value', () => {
      wrapper.element.value = '12345'

      wrapper.trigger('input')

      expect(wrapper.emitted('input')[1][0]).toBe(12345)
    })

    describe('when the input is cleared', () => {
      it('emits a null value', () => {
        wrapper.element.value = ''

        wrapper.trigger('input')

        expect(wrapper.emitted('input')[1][0]).toBeNull()
      })
    })
  })

  describe('when the input is changed externally', () => {
    it('formats the value correctly', () => {
      wrapper.setProps({ value: 12345 })

      expect(wrapper.element.value).toBe('€12,345.00')
    })

    it('emits the raw number value', () => {
      wrapper.setProps({ value: 12345 })

      expect(wrapper.emitted('input')[1][0]).toBe(12345)
    })

    it('ignores changes if focused', () => {
      wrapper.trigger('focus')

      wrapper.setProps({ value: 12345 })

      expect(wrapper.emitted('input')[1]).toBeFalsy()
    })
  })

  describe('when the input is focused', () => {
    describe('distraction free mode is enabled', () => {
      it('applies the distraction free format', () => {
        wrapper.setProps({ distractionFree: true })

        wrapper.trigger('focus')
        jest.runOnlyPendingTimers()

        expect(wrapper.element.value).toBe('1234.5')
      })

      it('sets the caret to right position if the locale is "en"', () => {
        wrapper.setProps({ value: 1234567.89, distractionFree: true })

        wrapper.element.setSelectionRange(8, 8)
        wrapper.trigger('focus')
        jest.runOnlyPendingTimers()

        expect(wrapper.element.selectionStart).toBe(5)
      })

      it('sets the caret to right position if the locale is "de"', () => {
        wrapper.setProps({ value: 1234567.89, distractionFree: true, locale: 'de' })

        wrapper.element.setSelectionRange(8, 8)
        wrapper.trigger('focus')
        jest.runOnlyPendingTimers()

        expect(wrapper.element.selectionStart).toBe(6)
      })
    })

    describe('distraction free mode is disabled', () => {
      it('leaves the current value untouched', () => {
        wrapper.setProps({ value: 5432.1, distractionFree: false })

        wrapper.trigger('focus')
        jest.runOnlyPendingTimers()

        expect(wrapper.vm.formattedValue).toBe('€5,432.10')
      })

      it('leaves the caret position untouched', () => {
        wrapper.setProps({ value: 5432.1, distractionFree: false })

        wrapper.element.setSelectionRange(3, 3)
        wrapper.trigger('focus')
        jest.runOnlyPendingTimers()

        expect(wrapper.element.selectionStart).toBe(3)
      })
    })
  })

  describe('when the input is blurred', () => {
    it('handles the native change event correctly', () => {
      wrapper.trigger('change')

      expect(wrapper.emitted('input')[1]).toBeFalsy()
    })

    it('applies the fixed fraction format', () => {
      wrapper.setProps({ value: 10 })

      wrapper.trigger('blur')

      expect(wrapper.vm.formattedValue).toBe('€10.00')
    })

    describe('the current value is less than the min value', () => {
      it('sets the min value', () => {
        wrapper.setProps({ value: 100, min: 1000 })

        wrapper.trigger('blur')

        expect(wrapper.vm.formattedValue).toBe('€1,000.00')
      })
    })

    describe('the current value is larger than the max value', () => {
      it('sets the max value', () => {
        wrapper.setProps({ value: 1500, max: 1000 })

        wrapper.trigger('blur')

        expect(wrapper.vm.formattedValue).toBe('€1,000.00')
      })
    })
  })
})

const mountComponent = (propsData) => {
  return shallowMount(CurrencyInput, { propsData, attachToDocument: true })
}
