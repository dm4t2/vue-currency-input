import { createLocalVue, mount } from '@vue/test-utils'
import plugin from '@/plugin'
import directive from '@/directive'

jest.useFakeTimers()

const mountComponent = (tag = 'input', propsData = {}, directiveOptions = {}, globalOptions) => {
  const localVue = createLocalVue()
  if (globalOptions) {
    localVue.use(plugin, { globalOptions })
  } else {
    localVue.directive('currency', directive)
  }

  return mount({
    props: ['value'],
    render (h) {
      return h('span', [
        h(tag, {
          directives: [{
            name: 'currency',
            value: directiveOptions
          }],
          domProps: {
            value: this.value
          },
          on: {
            input: event => {
              this.$emit('input', event.target.value)
            }
          }
        })
      ])
    }
  }, { propsData, localVue })
}

it('should throw an error if not used on a appreciate element', () => {
  jest.spyOn(console, 'error')
  console.error.mockImplementation(() => {})

  expect(() => mountComponent('div')).toThrowError('No input element found')
})

it('should respect the global plugin options if installed as plugin', () => {
  const wrapper = mountComponent('input', { value: 10 }, { locale: 'de' }, { currency: 'USD' })

  expect(wrapper.emitted('input')).toEqual([['10,00 $']])
})

describe('when the value is changed externally by using a format event', () => {
  it('should trigger a reformat of the input only if the value has actually changed', async () => {
    const wrapper = mountComponent('input', { value: 1234 }, { locale: 'en' })
    await wrapper.vm.$nextTick()

    wrapper.find('input').trigger('format', { detail: { value: 1234 } })

    expect(wrapper.emitted('input')).toEqual([['€1,234.00']])
  })
})

describe('when the input is focused', () => {
  it('should not emit an input event if empty', () => {
    const wrapper = mountComponent('input', { locale: 'en', distractionFree: true })

    wrapper.find('input').trigger('focus')
    jest.runOnlyPendingTimers()

    expect(wrapper.emitted('input')).toBeFalsy()
  })
})

describe('when the input is blurred', () => {
  it('should not emit an input event if empty', () => {
    const expectValue = (value, emittedValue, options) => {
      const wrapper = mountComponent('input', { value }, options)

      wrapper.find('input').trigger('blur')

      if (emittedValue === false) {
        expect(wrapper.emitted('input')).toBeFalsy()
      } else {
        expect(wrapper.emitted('input')).toEqual([[emittedValue], [emittedValue]])
      }
    }

    expectValue('', false, { locale: 'en' })
    expectValue('0', '€0.00', { locale: 'en' })
    expectValue('1234', '€1,234.00', { locale: 'en' })
  })
})
