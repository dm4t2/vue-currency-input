[![Build Status](https://travis-ci.com/dm4t2/vue-currency-input.svg?branch=master)](https://travis-ci.com/dm4t2/vue-currency-input)
[![codecov](https://codecov.io/gh/dm4t2/vue-currency-input/branch/master/graph/badge.svg)](https://codecov.io/gh/dm4t2/vue-currency-input)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f094b44873724daf98afa67f8f68c456)](https://www.codacy.com/manual/dm4t2/vue-currency-input)
[![npm version](https://badgen.net/npm/v/vue-currency-input?color=green)](https://www.npmjs.com/package/vue-currency-input)
[![Bundlephobia](https://badgen.net/bundlephobia/minzip/vue-currency-input?color=green)](https://bundlephobia.com/result?p=vue-currency-input)
[![License](https://badgen.net/github/license/dm4t2/vue-currency-input?color=green)](https://github.com/dm4t2/vue-currency-input/blob/master/LICENSE)

# Vue Currency Input
The Vue Currency Input plugin allows an easy input of currency formatted numbers. It provides both a standalone component (`<currency-input>`) and a custom Vue directive (`v-currency`) for decorating existing input components with currency format capabilities.

[![](docs/vue-currency-input.gif)](https://dm4t2.github.io/vue-currency-input)

## Features
* [Tiny bundle size](https://bundlephobia.com/result?p=vue-currency-input) and zero dependencies
* Format as you type
* Locale dependent, ISO-compliant currency formatting based on [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)
* Distraction free (hides the formatting on focus for easier input)
* Allows handling values as integer numbers for full precision
* Auto decimal mode (automatically inserts the decimal symbol, using the last inputted digits as decimal digits)
* Built-in value range validation
* Works with input components of popular frameworks like [Vuetify](https://codesandbox.io/s/using-vue-currency-input-with-vuetify-kd7d1) or [Element](https://codesandbox.io/s/using-vue-currency-input-with-element-ui-z8gik)

## Live Demo
Check out the [playground](https://dm4t2.github.io/vue-currency-input/playground/) to see it in action.

## Quick Start
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

Use the `<currency-input`> component:
``` vue
<template>
  <currency-input v-model="value" />
</template>

<script>
export default {
  data: () => ({ value: 1000 })
}
</script>
```

## Documentation
Please refer to the [project home page](https://dm4t2.github.io/vue-currency-input) for a detailed documentation.

## Support me
If you find this plugin helpful or you want to support the development, buy me a coffee:

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/D1D6SXEA)
