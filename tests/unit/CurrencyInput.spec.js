import { shallowMount } from '@vue/test-utils'
import Intl from 'intl'
import CurrencyInput from '../../src/CurrencyInput'

global.Intl = Intl

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

  describe('initial value', () => {
    describe('the initial value is a valid number', () => {
      it('sets the correct formatted value for configured currency and locale', () => {
        expect(mountComponent({ currency: 'EUR', locale: 'de', value: 1234.5 }).element.value).toBe('1.234,50 €')
        expect(mountComponent({ currency: 'EUR', locale: 'en', value: 1234.5 }).element.value).toBe('€1,234.50')
        expect(mountComponent({ currency: 'EUR', locale: 'fr', value: 1234.5 }).element.value).toBe('1 234,50 €')
      })

      it('rounds float numbers if the currency format supports no fraction', () => {
        expect(mountComponent({ currency: 'JPY', locale: 'de', value: 1234.5 }).element.value).toBe('1.235 ¥')
      })
    })

    describe('the initial value is invalid', () => {
      it('sets a empty value', () => {
        expect(mountComponent({ currency: 'EUR', value: '' }).element.value).toBe('')
        expect(mountComponent({ currency: 'EUR', value: ' ' }).element.value).toBe('')
        expect(mountComponent({ currency: 'EUR', value: 'foo' }).element.value).toBe('')
        expect(mountComponent({ currency: 'EUR', value: '1234,5' }).element.value).toBe('')
        expect(mountComponent({ currency: 'JPY', value: '1234,5' }).element.value).toBe('')
      })
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
      it('throws an error', () => {
        expect(() => mountComponent({ ...propsData, min: 500, max: 400 })).toThrowError('Invalid number range')
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
  return shallowMount(CurrencyInput, { propsData })
}
