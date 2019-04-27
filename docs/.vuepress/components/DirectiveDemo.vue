<template>
  <div class="demo">
    <input
      v-model="value"
      v-currency="{locale, currency, distractionFree, min, max}"
      class="demo__currency-input"/>
    <p>Raw number value: <code>{{ value !== null ? value : 'null' }}</code></p>
    <hr>
    <h3>Options</h3>
    <div class="demo__options">
      <p>
        <label>
          <span>Distraction free</span>
          <input
            v-model="distractionFree"
            type="checkbox">
        </label>
      </p>
      <p>
        <label>
          <span>Currency</span>
          <select v-model="currency">
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="JPY">JPY</option>
            <option value="GBP">GBP</option>
            <option value="BRL">BRL</option>
          </select>
        </label>
      </p>
      <p>
        <label>
          <span>Locale</span>
          <select v-model="locale">
            <option :value="undefined">auto</option>
            <option value="de">de</option>
            <option value="fr">fr</option>
            <option value="en">en</option>
            <option value="pt">pt</option>
            <option value="zh">zh</option>
          </select>
        </label>
      </p>
    </div>
  </div>
</template>

<script>
import currencyDirective from '../../../src/currencyDirective'
export default {
  name: 'DirectiveDemo',
  directives: {
    currency: currencyDirective
  },
  data () {
    return {
      value: 1234.5,
      currency: 'USD',
      locale: undefined,
      distractionFree: true,
      min: -Infinity,
      max: 1000
    }
  }
}
</script>

<style lang="scss" scoped>
@import "demo.scss";
</style>
