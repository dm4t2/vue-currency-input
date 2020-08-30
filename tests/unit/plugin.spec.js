import plugin from '@/plugin'
import Vue from 'vue'
import { getValue, setValue } from '@/api'
import component from '@/component'
import directive from '@/directive'

describe('when the plugin is installed', () => {
  it('should provide the respective API methods on the Vue prototype', () => {
    plugin.install(Vue)

    expect(Vue.prototype.$ci.getValue).toEqual(getValue)
    expect(Vue.prototype.$ci.setValue).toEqual(setValue)
  })

  it('should respect the plugin options if preset', () => {
    jest.spyOn(Vue, 'component')
    jest.spyOn(Vue, 'directive')
    const componentName = 'foo'
    const directiveName = 'bar'
    const globalOptions = { locale: 'de', currency: 'USD' }

    plugin.install(Vue, { componentName, directiveName, globalOptions })

    expect(Vue.component).toHaveBeenCalledWith(componentName, component)
    expect(Vue.directive).toHaveBeenCalledWith(directiveName, directive)
    expect(Vue.prototype.$ci.globalOptions).toEqual(globalOptions)
  })
})
