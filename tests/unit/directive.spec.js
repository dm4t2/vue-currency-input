import { createLocalVue, mount } from '@vue/test-utils'
import directive from '../../src/directive'

jest.useFakeTimers()

const localVue = createLocalVue()
localVue.directive('currency', directive)

const createMockComponent = (tag = 'input', propsData = {}, directiveOptions = {}) => mount({
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
          input: (event) => {
            this.$emit('input', event.target.value)
          }
        }
      })
    ])
  }
}, { propsData, localVue })

it('should throw an error if not used on a appreciate element', () => {
  jest.spyOn(console, 'error')
  console.error.mockImplementation(() => {})

  expect(() => createMockComponent('div')).toThrowError('No input element found')
})

describe('when the formatted value is applied on the input', () => {
  it('should emit an input event each time the value changes', async () => {
    const wrapper = createMockComponent('input', { value: 10 }, { valueRange: { min: 100 }, locale: 'en', distractionFree: false })
    await wrapper.vm.$nextTick()

    wrapper.find('input').trigger('focus')
    jest.runOnlyPendingTimers()
    wrapper.find('input').trigger('blur')

    expect(wrapper.emitted('input')).toEqual([['€100.00'], ['€100.00']])
  })
})

describe('when the value is changed externally by using a format event', () => {
  it('should trigger a reformat of the input only if the value has actually changed', async () => {
    const wrapper = createMockComponent('input', { value: 1234 }, { locale: 'en' })
    await wrapper.vm.$nextTick()

    wrapper.find('input').trigger('format', { detail: { value: 1234 } })

    expect(wrapper.emitted('input')).toEqual([['€1,234.00']])
  })
})
