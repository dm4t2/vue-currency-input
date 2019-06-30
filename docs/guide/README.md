---
sidebarDepth: 3
---

# Guide

## Introduction
The Vue Currency Input plugin allows an easy input of currency formatted numbers. 
It provides both a standalone component (`<currency-input>`) and a custom Vue directive (`v-currency`) for decorating existing input components with currency format capabilities.

## Getting started
Install the npm package:
``` bash
npm install vue-currency-input 
# OR 
yarn add vue-currency-input
```

Add the Vue plugin in your `main.js`:
``` js
import Vue from 'vue'
import VueCurrencyInput from 'vue-currency-input'

const pluginOptions = { /* see config reference */ }
Vue.use(VueCurrencyInput, pluginOptions)
```

This registers the component/directive globally and will provide the Vue instance method `$parseCurrency`.

## Usage
### Component
The `currency-input>` component only needs a number value binding. If used with `v-model`, it will always emit the raw number value. All other [component props](/config) are optional.

<<< @/docs/guide/ComponentUsage.vue

### Directive
The `v-currency` directive is great if you want to decorate existing input components with currency format capabilities (for example like those from [Vuetify](https://vuetifyjs.com/en/components/text-fields) or [Element](https://element.eleme.io/#/en-US/component/input)).

<<< @/docs/guide/DirectiveUsage.vue

::: warning Getting the raw number value
In comparision to the `<currency-input>` component the `v-currency` directive will always emit the formatted string instead of the raw number value when used with `v-model`. 
To get the number value you can use the `$parseCurrency` instance method (see [examples](/examples/#raw-number-value-with-directive)).
:::

## Alternative installation methods
### Import on demand
You can also import the component/directive on demand and register them locally in your Vue files. 
This is useful if you want to use [async components](https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components).

#### Component
```vue
<template>
  <currency-input :value="1000"/>
</template>

<script>
import { CurrencyInput } from 'vue-currency-input'
export default {
  components: { CurrencyInput }
}
</script>
```

#### Directive
```vue
<template>
  <input v-currency/>
</template>

<script>
import { CurrencyDirective } from 'vue-currency-input'
export default {
  directives: {
    currency: CurrencyDirective
  }
}
</script>

```

### Direct download via CDN
If you don't use a module system you can also download the plugin as UMD bundle via CDN. 
Include the plugin after Vue and it will install itself automatically:

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-currency-input"></script>
```

[Try it on CodeSandbox](https://codesandbox.io/s/vue-currency-input-direct-browser-usage-yjtci?fontsize=14)
