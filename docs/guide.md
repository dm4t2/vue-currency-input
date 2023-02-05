# Guide

## Introduction

Vue Currency Input allows an easy input of currency formatted numbers based on the [ECMAScript Internationalization API (Intl.NumberFormat)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).

Built on top of the [Vue Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html), it provides the composable function `useCurrencyInput` for decorating input components with currency format capabilities.

::: warning Compatibility
Vue Currency Input 3.x requires either **Vue 2.7** or **Vue 3**. For Vue 2.6 or earlier, please use Vue Currency Input 2.x with the [Vue Composition API plugin](https://github.com/vuejs/composition-api).
:::

## Installation
```bash
npm install vue-currency-input
```

## Usage

Vue Currency Input does not provide a ready-to-use component, instead it enables you to create your own based on your favorite input component (for example [Quasar](component-library-integrations#quasar) or [Element Plus](component-library-integrations#element-plus)).

::: info Code examples
The following code examples are for Vue 3. Deviations for Vue 2 are noted as inline code comments.
:::

### Creating a custom component

The following example component `<CurrencyInput>` uses a simple HTML input element.

The component must provide props for the `v-model` value binding and the options (see [Configuration](config)). Make also sure, that the input element has type `text` (or omit the type since it's the default).

```vue
<template>
  <input
    ref="inputRef"
    type="text"
  />
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'

export default {
  name: 'CurrencyInput',
  props: {
    modelValue: Number, // Vue 2: value
    options: Object
  },
  setup(props) {
    const { inputRef } = useCurrencyInput(props.options)

    return { inputRef }
  }
}
</script>
```

### Use the custom component

Now you can use the created `<CurrencyInput>` component in your app:

```vue
<template>
  <CurrencyInput
    v-model="value"
    :options="{ currency: 'EUR' }"
  />
</template>

<script>
import CurrencyInput from './CurrencyInput'

export default {
  name: 'App',
  components: { CurrencyInput },
  data: () => ({ value: 1234 })
}
</script>
```

[![Edit Vue Currency Input: Vue 3 Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vue-currency-input-vue-3-example-5l51f?fontsize=14&hidenavigation=1&theme=dark)

## Auto emit
By default, the number value is automatically emitted on each input.
This can be disabled by setting the `autoEmit` argument of `useCurrencyInput` to `false`, allowing you to implement a custom emit behavior for features such as debouncing.

The following example component `<DebouncedCurrencyInput>` demonstrates this by using [VueUse's `watchDebounced`](https://vueuse.org/shared/watchDebounced): 

```vue
<template>
  <input ref="inputRef" type="text" />
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'
import { watchDebounced } from '@vueuse/core'

export default {
  name: 'DebouncedCurrencyInput',
  props: {
    modelValue: Number, // Vue 2: value
    options: Object
  },
  setup (props, { emit }) {
    const { inputRef, numberValue } = useCurrencyInput(props.options, false)

    watchDebounced(numberValue, (value) => emit('update:modelValue', value), { debounce: 1000 }) // Vue 2: emit('input', value)

    return { inputRef }
  }
}
</script>
```

[![Edit Using Vue Currency Input with debouncing](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/using-vue-currency-input-with-debouncing-vzwnss?fontsize=14&hidenavigation=1&theme=dark)


## Lazy value binding

Sometimes you might want to update the bound value only when the input loses its focus. In this case, use `v-model.lazy` for Vue 3:

```vue
<CurrencyInput
  v-model.lazy="value"
  :options="{ currency: 'EUR' }"
/>
```

For Vue 2 listen to the `change` event instead of using `v-model`, since the `lazy` modifier is not supported when using `v-model` on custom components:

```vue
<CurrencyInput
  :value="value"
  :options="{ currency: 'EUR' }"
  @change="value = $event"
/>
```

## External props changes

If the value of the input is changed externally (and not only by user input) you need to use the `setValue` function returned by `useCurrencyInput` within a watcher.

The same applies for the options of your currency input component. Use the `setOptions` function in a watcher in order to make the options reactive for changes after the component has been mounted (like in the [Playground](playground)).

```vue
<template>
  <input ref="inputRef" />
</template>

<script>
import { watch } from 'vue' // Vue 2.6 or earlier: import { watch } from '@vue/composition-api'
import { useCurrencyInput } from 'vue-currency-input'

export default {
  name: 'CurrencyInput',
  props: {
    modelValue: Number, // Vue 2: value
    options: Object
  },
  setup(props) {
    const { inputRef, setOptions, setValue } = useCurrencyInput(props.options)

    watch(
      () => props.modelValue, // Vue 2: props.value
      (value) => {
        setValue(value)
      }
    )

    watch(
      () => props.options,
      (options) => {
        setOptions(options)
      }
    )

    return { inputRef }
  }
}
</script>
```
