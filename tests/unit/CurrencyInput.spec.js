import { shallowMount } from '@vue/test-utils'
import Intl from 'intl'
import CurrencyInput from '../../src/CurrencyInput'

global.Intl = Intl

jest.useFakeTimers()

const mountComponent = (propsData) => shallowMount(CurrencyInput, { propsData })

const expectInitialValue = (expectedValue, propsData, done) => {
  const wrapper = mountComponent(propsData)
  wrapper.vm.$nextTick(() => {
    expect(wrapper.element.value).toBe(expectedValue)
    done()
  })
}

describe('CurrencyInput', () => {
  describe('initial value', () => {
    describe('the initial value is a number', () => {
      it('sets the correct formatted value for configured currency and locale', (done) => {
        expectInitialValue('1.234,50 €', { locale: 'de', value: 1234.5 }, done)
        expectInitialValue('€1,234.52', { locale: 'en', value: 1234.523 }, done)
        expectInitialValue('1 234,00 €', { locale: 'fr', value: 1234 }, done)
      })

      it('rounds float numbers if the currency format supports no fraction', (done) => {
        expectInitialValue('1.235 ¥', { currency: 'JPY', locale: 'de', value: 1234.5 }, done)
      })
    })

    describe('the initial value is not a number', () => {
      it('sets a empty value', (done) => {
        expectInitialValue('', { value: '' }, done)
        expectInitialValue('', { value: ' ' }, done)
        expectInitialValue('', { value: 'foo' }, done)
        expectInitialValue('', { value: '1234,5' }, done)
      })
    })

    describe('the initial value is less than the min value', () => {
      it('sets the min value', (done) => {
        expectInitialValue('€1,000.00', { locale: 'en', value: 100, min: 1000 }, done)
      })
    })

    describe('the initial value is larger than the max value', () => {
      it('sets the max value', (done) => {
        expectInitialValue('€1,000.00', { locale: 'en', value: 1500, max: 1000 }, done)
      })
    })

    describe('the configured number range is invalid', () => {
      it('throws an error', () => {
        expect(() => mountComponent({ min: 500, max: 400 })).toThrowError('Invalid number range')
      })
    })
  })

  describe('when the input is changed by the user', () => {
    it('formats the value correctly', () => {
      const wrapper = mountComponent({ locale: 'en' })

      wrapper.setValue('12345')

      expect(wrapper.element.value).toBe('€12,345')
    })

    it('emits the raw number value', () => {
      const wrapper = mountComponent({ locale: 'en' })

      wrapper.setValue('12345')

      expect(wrapper.emitted('input')[0][0]).toBe(12345)
    })

    describe('when the input is cleared', () => {
      it('emits a null value', () => {
        const wrapper = mountComponent()

        wrapper.setValue('')

        expect(wrapper.emitted('input')[0][0]).toBeNull()
      })
    })
  })

  describe('when the input is changed externally', () => {
    it('formats the value correctly', () => {
      const wrapper = mountComponent({ locale: 'en' })

      wrapper.setProps({ value: 12345 })

      expect(wrapper.element.value).toBe('€12,345.00')
    })

    it('emits the raw number value', () => {
      const wrapper = mountComponent()

      wrapper.setProps({ value: 12345 })

      expect(wrapper.emitted('input')[0][0]).toBe(12345)
    })

    it('ignores changes if focused', () => {
      const wrapper = mountComponent()

      wrapper.trigger('focus')
      wrapper.setProps({ value: 12345 })

      expect(wrapper.emitted('value-change')).toBeFalsy()
    })
  })

  describe('when the input is focused', () => {
    describe('distraction free mode is enabled', () => {
      it('applies the distraction free format', () => {
        const wrapper = mountComponent({ locale: 'en', distractionFree: true })
        wrapper.setValue('1234.5')

        wrapper.trigger('focus')
        jest.runOnlyPendingTimers()

        expect(wrapper.element.value).toBe('1234.5')
      })

      it('sets the caret to the right position if the thousands separator is ","', () => {
        const wrapper = mountComponent({ locale: 'en', distractionFree: true })
        wrapper.setValue('1234567.89')

        wrapper.element.setSelectionRange(8, 8)
        wrapper.trigger('focus')
        jest.runOnlyPendingTimers()

        expect(wrapper.element.selectionStart).toBe(5)
      })

      it('sets the caret to the right position if the thousands separator is "."', () => {
        const wrapper = mountComponent({ locale: 'de', distractionFree: true })
        wrapper.setValue('1234567.89')

        wrapper.element.setSelectionRange(8, 8)
        wrapper.trigger('focus')
        jest.runOnlyPendingTimers()

        expect(wrapper.element.selectionStart).toBe(6)
      })
    })

    describe('distraction free mode is disabled', () => {
      it('leaves the current value untouched', () => {
        const wrapper = mountComponent({ locale: 'en', distractionFree: false })
        wrapper.setValue('5432.10')

        wrapper.trigger('focus')
        jest.runOnlyPendingTimers()

        expect(wrapper.element.value).toBe('€5,432.10')
      })

      it('leaves the caret position untouched', () => {
        const wrapper = mountComponent({ locale: 'en', distractionFree: false })
        wrapper.setValue('5432.10')

        wrapper.element.setSelectionRange(3, 3)
        wrapper.trigger('focus')
        jest.runOnlyPendingTimers()

        expect(wrapper.element.selectionStart).toBe(3)
      })
    })
  })

  describe('when the input is blurred', () => {
    it('applies the fixed fraction format', () => {
      const wrapper = mountComponent({ locale: 'en' })

      wrapper.trigger('focus')
      wrapper.setValue('1.34')
      wrapper.trigger('blur')

      expect(wrapper.element.value).toBe('€1.34')
    })

    describe('the current value is less than the min value', () => {
      it('sets the min value', () => {
        const wrapper = mountComponent({ locale: 'en', min: 1000 })

        wrapper.trigger('focus')
        wrapper.setValue('100')
        wrapper.trigger('blur')

        expect(wrapper.element.value).toBe('€1,000.00')
      })
    })

    describe('the current value is larger than the max value', () => {
      it('sets the max value', () => {
        const wrapper = mountComponent({ locale: 'en', max: 1000 })

        wrapper.trigger('focus')
        wrapper.setValue('1500')
        wrapper.trigger('blur')

        expect(wrapper.element.value).toBe('€1,000.00')
      })
    })
  })
})
