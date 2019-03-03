<template>
  <div class="demo">
    <CurrencyInput
      v-model="value"
      :currency="currency"
      :locale="locale"
      :distraction-free="distractionFree"
      :allow-negative="allowNegative"
      class="demo__currency-input"/>
    <p>Raw number value: <code>{{ value !== null ? value : 'null' }}</code></p>
    <hr>
    <h3>Settings</h3>
    <div class="settings">
      <p>
        <label>
          <span>Allow negative</span>
          <input
            v-model="allowNegative"
            type="checkbox">
        </label>
      </p>
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
import CurrencyInput from '../../../src/CurrencyInput'

export default {
  name: 'ComponentDemo',
  components: { CurrencyInput },
  data () {
    return {
      value: 1234.5,
      currency: 'USD',
      locale: undefined,
      distractionFree: true,
      allowNegative: true
    }
  }
}
</script>

<style lang="css">
.demo {
  background-color: #f6f8fa;
  padding: 32px;
}

.settings p {
  display: flex;
  align-items: center;
  margin: 0 0 4px 0;
}

.settings label > span {
  display: inline-block;
  width: 150px;
}

select, input {
  margin: 0;
  font-size: 16px;
}

.demo__currency-input {
  font-size: 24px;
  padding: 8px 12px;
  max-width: 100%;
  box-sizing: border-box;
}
</style>
