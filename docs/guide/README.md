---
sidebar: auto
---

# Overview

## Introduction
The Vue Currency Input plugin provides a standalone component (`<currency-input>`) and a directive (`v-currency`) allowing an easy input of currency formatted numbers.

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

Vue.use(VueCurrencyInput)
```

## Usage
### Component
``` vue
<template>
  <currency-input v-model="value" :currency="currency"/>
</template>

<script>
export default {
  data: () => ({
    value: 1000,
    currency: 'USD'
  })
}
</script>
```

### Directive
The `v-currency` directive is great if you want to decorate existing input components with currency format capabilities (for example like those from [Vuetify](https://vuetifyjs.com/en/components/text-fields) or [Element](https://element.eleme.io/#/en-US/component/input)).

``` vue
<template>
  <input v-model="value" v-currency="{currency}"/>
</template>

<script>
export default {
  data: () => ({
    value: 1000,
    currency: 'USD'
  })
}
</script>
```

## Configuration

Name | Type | Description
--- | --- | --- 
`value` | Number |  The value of the input. If `v-model` is used with the component, it will always emit the raw number value (see [Live Demo](/demo/))
`currency` | String | A [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code (for example `USD` or `EUR`). This prop is required.
`locale` | String | A [BCP 47](https://tools.ietf.org/html/bcp47) language tag (for example `en` or `de-DE`). Default is the runtime's default locale.
`distraction-free` | Boolean | Whether to hide the formatting and unnecessary fraction digits on focus. Default is `true`.
`min` | Number | Minimun value. Default is `null` (no limitation). Must be less than `max`.
`max` | Number | Maximum value. Default is `null` (no limitation). Must be greater than `min`.
