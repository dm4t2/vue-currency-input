import { DEFAULT_OPTIONS } from './api'
import equal from './utils/equal'
import { NumberInput } from './numberInput'

export default {
  bind (el, { value: optionsFromBinding }, vnode) {
    const inputElement = el.tagName.toLowerCase() === 'input' ? el : el.querySelector('input')
    if (!inputElement) {
      throw new Error('No input element found')
    }
    const options = {
      ...DEFAULT_OPTIONS,
      ...(vnode.context.$ci || {}).globalOptions,
      ...optionsFromBinding
    }
    const listeners = (vnode.data && vnode.data.on) || (vnode.componentOptions && vnode.componentOptions.listeners) || {}

    const emit = (event, data) => {
      if (listeners[event]) {
        listeners[event](vnode.componentOptions ? data : { target: { value: data } })
      }
    }

    el.$ci = new NumberInput(inputElement, options, {
      onChange: () => { emit('change', inputElement.value) },
      onInput: () => { emit('input', inputElement.value) }
    })
  },
  componentUpdated (el, { value, oldValue }) {
    if (!equal(value, oldValue)) {
      el.$ci.setOptions(value)
    }
  }
}
