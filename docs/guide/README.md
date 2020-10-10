---
sidebarDepth: 3
---
# Guide

:::warning Version
You’re browsing the documentation for v2.x. [For v1.x, click here](https://vue-currency-input-v1.netlify.app/).
:::

## Introduction
Vue Currency Input allows an easy input of currency formatted numbers. Powered by the [Vue Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html), it provides a Vue composable for decorating input components with currency format capabilities.

![](../vue-currency-input.gif)

## Installation
Install the npm package:

<code-group>
<code-block title="npm">
``` bash
npm install vue-currency-input 
```
</code-block>

<code-block title="yarn">
``` bash
yarn add vue-currency-input 
```
</code-block>
</code-group>

For usage with Vue 2 you have to install also the `@vue/composition-api` package:

<code-group>
<code-block title="npm">
``` bash
npm install @vue/composition-api
```
</code-block>

<code-block title="yarn">
``` bash
yarn add @vue/composition-api
```
</code-block>
</code-group>

## Usage
Vue Currency Input does not provide a ready-to-use component, instead it enables you to create your own based on your favorite input component (for example [Vuetify](https://vuetifyjs.com/en/components/text-fields/), [Quasar](https://quasar.dev/vue-components/input) or [Element](https://element.eleme.io/#/en-US/component/input)).

The following example component `<currency-input>` uses a simple HTML input element:

<code-group>
<code-block title="Vue 3">
``` vue
<template>
  <input ref="inputRef" :value="formattedValue">
</template>

<script>
import { ref } from 'vue'
import useCurrencyInput from 'vue-currency-input'

export default {
  name: 'CurrencyInput',
  props: {
    modelValue: Number,
    currency: String
    // additional props for options...
  },
  setup (props, { emit }) {
    const inputRef = ref(null)
    const { formattedValue } = useCurrencyInput({ inputRef, props, emit })

    return { inputRef, formattedValue }
  }
}
</script>
```
</code-block>

<code-block title="Vue 2">
``` vue
<template>
  <input ref="inputRef" :value="formattedValue">
</template>

<script>
import { ref } from '@vue/composition-api'
import useCurrencyInput from 'vue-currency-input'

export default {
  name: 'CurrencyInput',
  props: {
    value: Number, 
    currency: String
    // additional props for options...
  },
  setup (props, { emit }) {
    const inputRef = ref(null)
    const { formattedValue } = useCurrencyInput({ inputRef, props, emit })

    return { inputRef, formattedValue }
  }
}
</script>
```
</code-block>
</code-group>


The component should provide at least props for the `v-model` value binding and the currency. Optionally further props can be added for the respective options (see [Config Reference](/config/)).

Now you can use the created `<currency-input>` component in your app:
``` vue
<template>
  <currency-input v-model="value" currency="EUR" />
</template>

<script>
import CurrencyInput from 'CurrencyInput.vue'

export default {
  name: 'App',
  components: { CurrencyInput },
  data: () => ({ value: 1234 })
}
</script> 
```

### Lazy value binding
Sometimes you might want to update the bound value only when the input loses its focus. In this case, use the `v-model.lazy` for Vue 3. For Vue 2 listen to the `change` event instead of using `v-model`.

<code-group>
<code-block title="Vue 3">
``` vue
<template>
  <currency-input v-model.lazy="value" currency="EUR" />
</template>

<script>
import CurrencyInput from 'CurrencyInput.vue'

export default {
  name: 'App',
  components: { CurrencyInput },
  data: () => ({ value: 1234 })
}
</script> 
```
</code-block>

<code-block title="Vue 2">
``` vue
<template>
  <currency-input :value="value" currency="EUR" @change="value = $event" />
</template>

<script>
import CurrencyInput from 'CurrencyInput.vue'

export default {
  name: 'App',
  components: { CurrencyInput },
  data: () => ({ value: 1234 })
}
</script> 
```
</code-block>
</code-group>
