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
            input: (event) => {
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
