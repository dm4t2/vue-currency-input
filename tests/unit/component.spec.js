import { config, shallowMount } from '@vue/test-utils'
import { DEFAULT_OPTIONS } from '../../src/api'
import CurrencyInput from '../../src/component'

jest.useFakeTimers()

const mountComponent = (propsData) => shallowMount(CurrencyInput, { propsData })

const expectInitialValue = async (expectedValue, propsData) => {
  const wrapper = mountComponent(propsData)
  await wrapper.vm.$nextTick()
  expect(wrapper.element.value).toBe(expectedValue)
}

beforeEach(() => {
  delete config.mocks.$CI_DEFAULT_OPTIONS
})

describe('initial value', () => {
  describe('the initial value is a number', () => {
    it('should set the expected formatted value for the configured currency and locale', async () => {
      await expectInitialValue('1.234,50 €', { locale: 'de', value: 1234.5 })
      await expectInitialValue('€1,234.52', { locale: 'en', value: 1234.523 })
      await expectInitialValue('1 234,00 €', { locale: 'fr', value: 1234 })
      await expectInitialValue('€ -1,00', { locale: 'nl-NL', value: -1 })
    })

    it('should respect the global options if present', async () => {
      config.mocks.$CI_DEFAULT_OPTIONS = { ...DEFAULT_OPTIONS, locale: 'uk', currency: 'UAH' }

      await expectInitialValue('1 234,50 ₴', { value: 1234.5 })
    })

    it('should round float numbers if the currency supports no decimal digits', async () => {
      await expectInitialValue('1.235 ¥', { currency: 'JPY', locale: 'de', value: 1234.5 })
    })

    it('should set the expected formatted value if the value is handled as integer', async () => {
      await expectInitialValue('1.234,56 €', { locale: 'de', valueAsInteger: true, value: 123456 })
      await expectInitialValue('12,35 €', { locale: 'de', valueAsInteger: true, value: 1234.5 })
      await expectInitialValue('0,01 €', { locale: 'de', valueAsInteger: true, value: 1 })
      await expectInitialValue('0,00001 €', { locale: 'de', precision: 5, valueAsInteger: true, value: 1 })
    })

    it('should ignore negative values if not allowed', async () => {
      await expectInitialValue('1.234,00 €', { locale: 'de', allowNegative: false, value: -1234 })
    })
  })

  describe('the initial value is not a number', () => {
    it('should set an empty value', async () => {
      jest.spyOn(console, 'error')
      console.error.mockImplementation(() => {})

      await expectInitialValue('', { locale: 'en', value: '1234' })
    })
  })

  describe('the initial value is null', () => {
    it('should set an empty value', async () => {
      await expectInitialValue('', { locale: 'en', value: null })
    })
  })

  describe('the initial value is less than the min value', () => {
    it('sets the min value', async () => {
      await expectInitialValue('€1,000.00', { locale: 'en', value: 100, valueRange: { min: 1000 } })
    })
  })

  describe('the initial value is larger than the max value', () => {
    it('sets the max value', async () => {
      await expectInitialValue('€1,000.00', { locale: 'en', value: 1500, valueRange: { max: 1000 } })
    })
  })
})

describe('component options', () => {
  it('should fallback to the default options values for the props which are not set', () => {
    const wrapper = mountComponent({ locale: 'de' })

    expect(wrapper.vm.options).toEqual({ ...DEFAULT_OPTIONS, locale: 'de' })
  })

  it('should fallback to the global options values for the props which are not set', () => {
    config.mocks.$CI_DEFAULT_OPTIONS = { ...DEFAULT_OPTIONS, distractionFree: false, currency: 'USD' }
    const wrapper = mountComponent({ locale: 'de' })

    expect(wrapper.vm.options).toEqual({ ...config.mocks.$CI_DEFAULT_OPTIONS, locale: 'de' })
  })

  it('should reformat the value if the options get changed', async () => {
    const wrapper = mountComponent({ locale: 'en', currency: 'USD' })
    wrapper.setValue(-1234.56)

    expect(wrapper.element.value).toBe('-$1,234.56')
    wrapper.setProps({ locale: 'nl-NL' })
    await wrapper.vm.$nextTick()
    expect(wrapper.element.value).toBe('US$ -1.234,56')
  })

  it('should emit a change event if the valueAsInteger option is toggled', async () => {
    const wrapper = mountComponent({ locale: 'en', currency: 'USD', valueAsInteger: true })
    wrapper.setValue(1234)

    wrapper.setProps({ valueAsInteger: false })
    await wrapper.vm.$nextTick()
    wrapper.setProps({ valueAsInteger: true })
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('change')).toEqual([[12.34], [1234]])
  })
})

describe('when the input is changed by the user', () => {
  const expectValue = (value, formattedValue, emittedValue, propsData) => {
    const wrapper = mountComponent(propsData)
    wrapper.trigger('focus')
    wrapper.setValue(value)
    expect(wrapper.element.value).toBe(formattedValue)
    expect(wrapper.emitted('input')[0][0]).toBe(emittedValue)
  }

  it('should update the displayed value and emit the parsed number', () => {
    const propsData = { locale: 'en', distractionFree: false }

    expectValue('12345', '€12,345', 12345, propsData)
    expectValue('-1', '-€1', -1, propsData)
    expectValue('-0', '-€0', -0, propsData)
    expectValue('', '', null, { ...propsData, value: 0 })
    expectValue('', '', null, { ...propsData, valueAsInteger: true, value: 1 })
    expectValue('1.', '€1.', 100, { ...propsData, valueAsInteger: true })
    expectValue('1', '€1', 100, { ...propsData, valueAsInteger: true })
    expectValue('-1', '€1', 1, { ...propsData, allowNegative: false })
    expectValue('1.0', '€1.0', 1, { ...propsData, precision: { min: 0, max: 2 } })
  })

  describe('negligible decimal digits are hidden on focus', () => {
    it('allows the input of decimal zeros', () => {
      const propsData = { locale: 'de', distractionFree: { hideNegligibleDecimalDigits: true } }

      expectValue('1,0', '1,0 €', 1, propsData)
      expectValue('-2000,10', '-2.000,10 €', -2000.1, propsData)
    })
  })

  describe('the grouping symbol is "." and not hidden on focus', () => {
    it('emits the expected number', () => {
      const propsData = { locale: 'de', distractionFree: { hideCurrencySymbol: true, hideGroupingSymbol: false } }

      expectValue('1234', '1.234', 1234, propsData)
    })
  })
})

describe('when the input is changed externally', () => {
  it('should update the displayed value', async () => {
    const expectValue = async (value, formattedValue, propsData) => {
      const wrapper = mountComponent(propsData)
      wrapper.setProps({ value })
      await wrapper.vm.$nextTick()
      expect(wrapper.element.value).toBe(formattedValue)
    }

    await expectValue(12345, '€12,345.00', { locale: 'en' })
    await expectValue(-1, '-€1.00', { locale: 'en' })
    await expectValue(1, '€1.00', { locale: 'en', allowNegative: false })
    await expectValue(0, '€0.00', { locale: 'en' })
    await expectValue(null, '', { locale: 'en', value: 0 })
    await expectValue(12345, '€123.45', { locale: 'en', valueAsInteger: true })
    await expectValue(-1, '-€0.01', { locale: 'en', valueAsInteger: true })
  })

  it('should never emit an input event unless the original value has been changed', async () => {
    const expectValue = async (value, emittedValue, propsData) => {
      const wrapper = mountComponent(propsData)
      wrapper.setProps({ value })
      await wrapper.vm.$nextTick()
      if (emittedValue === false) {
        expect(wrapper.emitted('input')).toBeFalsy()
      } else {
        expect(wrapper.emitted('input')[0][0]).toBe(emittedValue)
      }
    }

    await expectValue(12345, false, { locale: 'en' })
    await expectValue(12345, false, { locale: 'en', value: 12345 })
    await expectValue(1000, 100, { locale: 'en', valueRange: { max: 100 } })
    await expectValue(10, 100, { locale: 'en', valueRange: { min: 100 } })
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

  it('should never emit an change event unless the original value has been changed', async () => {
    const expectValue = async (value, emittedValue, propsData) => {
      const wrapper = mountComponent(propsData)
      await wrapper.vm.$nextTick()

      wrapper.trigger('focus')
      wrapper.setValue(value)
      wrapper.trigger('blur')

      if (emittedValue === false) {
        expect(wrapper.emitted('change')).toBeFalsy()
      } else {
        expect(wrapper.emitted('change')).toEqual(emittedValue)
      }
    }

    await expectValue('100', [[100]], { locale: 'en' })
    await expectValue('100', [[100]], { locale: 'en', value: 0 })
    await expectValue('100', false, { locale: 'en', value: 100 })
  })

  it('should ignore native change events of the input', () => {
    const wrapper = mountComponent()

    wrapper.trigger('change')

    expect(wrapper.emitted('change')).toBeFalsy()
  })

  describe('when a min value is present', () => {
    it('sets the current value to the min value if smaller', () => {
      const wrapper = mountComponent({ locale: 'en', valueRange: { min: 1000 } })

      wrapper.trigger('focus')
      wrapper.setValue('100')
      wrapper.trigger('blur')

      expect(wrapper.element.value).toBe('€1,000.00')
      expect(wrapper.emitted('change')[0][0]).toBe(1000)
    })
  })

  describe('when a max value is present', () => {
    it('sets the current value to the max value if larger', () => {
      const wrapper = mountComponent({ locale: 'en', valueRange: { max: 1000 } })

      wrapper.trigger('focus')
      wrapper.setValue('1500')
      wrapper.trigger('blur')

      expect(wrapper.element.value).toBe('€1,000.00')
      expect(wrapper.emitted('change')[0][0]).toBe(1000)
    })
  })
})

describe('when a custom precision is used', () => {
  describe('the currency supports no decimal digits', () => {
    it('ignores the configuration', async () => {
      await expectInitialValue('¥3', { locale: 'en', currency: 'JPY', precision: { min: 5, max: 5 }, value: 3.1415926535 })
    })
  })

  describe('the currency supports decimal digits', () => {
    it('applies the custom decimal length', async () => {
      await expectInitialValue('€3', { locale: 'en', currency: 'EUR', precision: 0, value: 3.1415926535 })
      await expectInitialValue('€3', { locale: 'en', currency: 'EUR', precision: { min: 0, max: 0 }, value: 3.1415926535 })
      await expectInitialValue('€3.14159', { locale: 'en', currency: 'EUR', precision: 5, value: 3.1415926535 })
      await expectInitialValue('€3.14159', { locale: 'en', currency: 'EUR', precision: { min: 5, max: 5 }, value: 3.1415926535 })
      await expectInitialValue('€3.14159', { locale: 'en', currency: 'EUR', precision: { min: 0, max: 5 }, value: 3.1415926535 })
      await expectInitialValue('€3.14000', { locale: 'en', currency: 'EUR', precision: { min: 5, max: 5 }, value: 3.14 })
      await expectInitialValue('€3.14', { locale: 'en', currency: 'EUR', precision: { min: 0, max: 5 }, value: 3.14 })
      await expectInitialValue('€3.1415926535', { locale: 'en', currency: 'EUR', precision: { min: 0 }, value: 3.1415926535 })
      await expectInitialValue('€3.14', { locale: 'en', currency: 'EUR', precision: { max: 5 }, value: 3.14 })
    })
  })

  describe('auto decimal mode is enabled', () => {
    it('applies the custom decimal length', async () => {
      await expectInitialValue('€3', { locale: 'en', currency: 'EUR', autoDecimalMode: true, precision: 0, value: 3.1415926535 })
      await expectInitialValue('€3.14159', { locale: 'en', currency: 'EUR', autoDecimalMode: true, precision: 5, value: 3.1415926535 })
    })

    it('ignores precision ranges', async () => {
      await expectInitialValue('€3.14', { locale: 'en', currency: 'EUR', autoDecimalMode: true, precision: { min: 5, max: 5 }, value: 3.1415926535 })
    })
  })
})
