---
sidebar: auto
---

# Getting started
## Installation
``` bash
npm install vue-currency-input 
# OR 
yarn add vue-currency-input
```

## Local import
``` vue
<template>
  <CurrencyInput v-model="value" :currency="currency"/>
</template>

<script>
import CurrencyInput from 'vue-currency-input'

export default {
  components: { CurrencyInput },
  data: () => ({
    value: 1000,
    currency: 'USD'
  })
}
</script>
```
    
## Configuration
The component can be configured by the following properties:

Name | Type | Description
--- | --- | --- 
`value` | Number |  The value of the input. In conjunction with `v-model` it updates the binded value with the raw number value on input changes.
`currency` | String | A [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code (for example `USD` or `EUR`). This prop is required.
`locale` | String | A [BCP 47](https://tools.ietf.org/html/bcp47) language tag (for example `en` or `de-DE`). Default is the runtime's default locale.
`distraction-free` | Boolean | Whether to hide the currency prefix/suffix and unnecessary fraction part on focus. Default is `true`.
`allow-negative` | Boolean | Whether negative values are allowed. Default is `true`.
