<template>
  <div id="app">
    <header>
      <h1>Vue Currency Input Demo</h1>
    </header>
    <label>Input a number: </label>
    <CurrencyInput
      v-model="value"
      :currency="currency"
      :locale="locale"
      :distraction-free="distractionFree"
      :allow-negative="allowNegative"
      class="currency-input"/>
    <p>Raw number value: {{ value }}</p>
    <aside>
      <h3>Settings</h3>
      <p>
        <label>
          <input
            v-model="allowNegative"
            type="checkbox">
          Allow negative
        </label>
      </p>
      <p>
        <label>
          <input
            v-model="distractionFree"
            type="checkbox">
          Distraction free
        </label>
      </p>
      <p>
        <label>Currency:
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
        <label>Locale:
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
    </aside>
  </div>
</template>

<script>
import CurrencyInput from './components/CurrencyInput'

export default {
  name: 'App',
  components: { CurrencyInput },
  data () {
    return {
      value: 200,
      currency: 'USD',
      locale: undefined,
      distractionFree: true,
      allowNegative: true
    }
  }
}
</script>

<style lang="css">
#app {
  font-family: "Segoe UI", Arial, sans-serif;
}

select,
.currency-input {
  font-size: 16px;
}
</style>
