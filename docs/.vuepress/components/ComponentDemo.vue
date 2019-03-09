<template>
  <div class="demo">
    <CurrencyInput
      v-model="value"
      :currency="currency"
      :locale="locale"
      :distraction-free="distractionFree"
      :min="min"
      :max="max"
      class="demo__currency-input"/>
    <p>Raw number value: <code>{{ value !== null ? value : 'null' }}</code></p>
    <hr>
    <h3>Settings</h3>
    <div class="settings">
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
      <p>
        <label>
          <span>Min value</span>
          <input
            min="-10000"
            :max="max ? max : 10000"
            v-model.number="min"
            type="range">
        </label>
        <code v-if="min">{{ min }}</code>
      </p>
      <p>
        <label>
          <span>Max value</span>
          <input
            :min="min ? min : -10000"
            max="10000"
            v-model.number="max"
            type="range">
        </label>
        <code v-if="max">{{ max }}</code>
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
      value: null,
      currency: 'USD',
      locale: undefined,
      distractionFree: true,
      min: null,
      max: null
    }
  }
}
</script>

<style lang="css" scoped>
.demo {
  background-color: #f6f8fa;
  padding: 32px;
}

.settings p {
  display: flex;
  align-items: center;
  margin: 0 0 4px 0;
  height: 30px;
}

.settings label {
  display: flex;
  align-items: center;
}

.settings p code {
  margin-left: 8px;
}

.settings label > span {
  display: inline-block;
  width: 130px;
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
