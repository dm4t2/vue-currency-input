import { shallowMount } from '@vue/test-utils'
import Intl from 'intl'
import CurrencyInput from '../../src/component'

global.Intl = Intl

jest.useFakeTimers()

const mountComponent = (propsData) => shallowMount(CurrencyInput, { propsData })

const expectInitialValue = async (expectedValue, propsData) => {
  const wrapper = mountComponent(propsData)
  await wrapper.vm.$nextTick()
  expect(wrapper.element.value).toBe(expectedValue)
}

describe('CurrencyInput', () => {
  describe('initial value', () => {
    describe('the initial value is a number', () => {
      it('sets the expected formatted value for the configured currency and locale', async () => {
        await expectInitialValue('1.234,50 €', { locale: 'de', value: 1234.5 })
        await expectInitialValue('€1,234.52', { locale: 'en', value: 1234.523 })
        await expectInitialValue('1 234,00 €', { locale: 'fr', value: 1234 })
        await expectInitialValue('€ -1,00', { locale: 'nl-NL', value: -1 })
      })

      it('rounds float numbers if the currency supports no decimal digits', async () => {
        await expectInitialValue('1.235 ¥', { currency: 'JPY', locale: 'de', value: 1234.5 })
      })

      it('sets the expected formatted value if the value is handled as integer', async () => {
        await expectInitialValue('1.234,56 €', { locale: 'de', valueAsInteger: true, value: 123456 })
        await expectInitialValue('12,35 €', { locale: 'de', valueAsInteger: true, value: 1234.5 })
        await expectInitialValue('0,01 €', { locale: 'de', valueAsInteger: true, value: 1 })
        await expectInitialValue('0,00001 €', { locale: 'de', decimalLength: 5, valueAsInteger: true, value: 1 })
      })
    })

    describe('the initial value is not a number', () => {
      it('sets a empty value', async () => {
        await expectInitialValue('', { value: '' })
        await expectInitialValue('', { value: ' ' })
        await expectInitialValue('', { value: 'foo' })
      })
    })

    describe('the initial value is less than the min value', () => {
      it('sets the min value', async () => {
        await expectInitialValue('€1,000.00', { locale: 'en', value: 100, min: 1000 })
      })
    })

    describe('the initial value is larger than the max value', () => {
      it('sets the max value', async () => {
        await expectInitialValue('€1,000.00', { locale: 'en', value: 1500, max: 1000 })
      })
    })

    describe('the configured number range is invalid', () => {
      it('throws an error', () => {
        expect(() => mountComponent({ min: 500, max: 400 })).toThrowError('Invalid value range')
      })
    })
  })

  describe('when the input is changed by the user', () => {
    it('formats the value and emits the parsed number', () => {
      const expectValue = (value, formattedValue, emittedValue, propsData) => {
        const wrapper = mountComponent(propsData)
        wrapper.setValue(value)
        expect(wrapper.element.value).toBe(formattedValue)
        expect(wrapper.emitted('input')[0][0]).toBe(emittedValue)
      }

      expectValue('12345', '€12,345', 12345, { locale: 'en' })
      expectValue('-1', '-€1', -1, { locale: 'en' })
      expectValue('-0', '-€0', -0, { locale: 'en' })
      expectValue('', '', null, { locale: 'en' })
      expectValue('1.', '€1.', 100, { locale: 'en', valueAsInteger: true })
    })

    describe('the grouping symbol is "." and not hidden on focus', () => {
      it('emits the expected number', () => {
        const wrapper = mountComponent({ locale: 'de', distractionFree: { hideCurrencySymbol: true, hideGroupingSymbol: false } })

        wrapper.trigger('focus')
        wrapper.setValue('1234')

        expect(wrapper.emitted('input')[0][0]).toBe(1234)
      })
    })
  })

  describe('when the input is changed externally', () => {
    it('formats the value correctly', () => {
      const wrapper = mountComponent({ locale: 'en' })

      wrapper.setProps({ value: 12345 })
      expect(wrapper.element.value).toBe('€12,345.00')

      wrapper.setProps({ value: -1 })
      expect(wrapper.element.value).toBe('-€1.00')
    })

    it('sets the expected formatted value if the value is handled as integer', () => {
      const wrapper = mountComponent({ locale: 'en', valueAsInteger: true })

      wrapper.setProps({ value: 12345 })
      expect(wrapper.element.value).toBe('€123.45')

      wrapper.setProps({ value: -1 })
      expect(wrapper.element.value).toBe('-€0.01')
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

      expect(wrapper.emitted('input')).toBeFalsy()
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

      it('displays negligible decimal digits if auto decimal mode is enabled', () => {
        const wrapper = mountComponent({ locale: 'en', distractionFree: true, autoDecimalMode: true })
        wrapper.setValue('1234.50')

        wrapper.trigger('focus')
        jest.runOnlyPendingTimers()

        expect(wrapper.element.value).toBe('1234.50')
      })

      it('sets the caret to the right position if no text was selected', () => {
        const wrapper = mountComponent({ locale: 'en', distractionFree: true })
        wrapper.setValue('1234567.89')

        wrapper.element.setSelectionRange(8, 8)
        wrapper.trigger('focus')
        jest.runOnlyPendingTimers()

        expect(wrapper.element.selectionStart).toBe(5)
      })

      it('preserves the selected text if present', () => {
        const wrapper = mountComponent({ locale: 'en', distractionFree: true })
        wrapper.setValue('1234567.89')

        wrapper.element.setSelectionRange(0, 10)
        wrapper.trigger('focus')
        jest.runOnlyPendingTimers()

        expect(wrapper.element.selectionStart).toBe(0)
        expect(wrapper.element.selectionEnd).toBe(10)
      })

      it('hides the currency symbol if the value is incomplete', () => {
        const wrapper = mountComponent({ locale: 'en', distractionFree: { hideCurrencySymbol: true } })

        wrapper.trigger('focus')
        jest.runOnlyPendingTimers()

        wrapper.setValue('-')
        expect(wrapper.element.value).toBe('-')

        wrapper.setValue('2.')
        expect(wrapper.element.value).toBe('2.')

        wrapper.setValue('.')
        expect(wrapper.element.value).toBe('0.')
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

  describe('when the component options are changed', () => {
    it('formats the value according to the new options', () => {
      const wrapper = mountComponent({ locale: 'en', currency: 'USD' })
      wrapper.setValue(-1234.56)

      expect(wrapper.element.value).toBe('-$1,234.56')
      wrapper.setProps({ locale: 'nl-NL' })
      expect(wrapper.element.value).toBe('US$ -1.234,56')
    })
  })

  describe('custom decimal length', () => {
    describe('when the currency supports no decimal digits', () => {
      it('ignores the configuration', async () => {
        await expectInitialValue('¥3', { locale: 'en', currency: 'JPY', decimalLength: 5, value: 3.1415926535 })
      })
    })

    describe('when the currency supports decimal digits', () => {
      it('applies the custom decimal length', async () => {
        await expectInitialValue('€3.14159', { locale: 'en', currency: 'EUR', decimalLength: 5, value: 3.1415926535 })
      })
    })
  })
})
