<template>
  <div class="demo">
    <CurrencyInput
      v-model="value"
      :currency="currency"
      :locale="locale"
      class="demo__currency-input"/>
    <div class="demo__options">
      <p>
        <label>
          <span>Currency</span>
          <select v-model="currency">
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="JPY">JPY</option>
            <option value="GBP">GBP</option>
            <option value="BRL">BRL</option>
            <option value="INR">INR</option>
            <option value="CNY">CNY</option>
          </select>
        </label>
      </p>
      <p>
        <label>
          <span>Locale</span>
          <select v-model="locale">
            <option :value="undefined">auto</option>
            <option value="de-DE">de-DE</option>
            <option value="fr-FR">fr-FR</option>
            <option value="en-US">en-US</option>
            <option value="en-IN">en-IN</option>
            <option value="es-ES">es-ES</option>
            <option value="pt-PT">pt-PT</option>
            <option value="zh-ZH">zh-ZH</option>
          </select>
        </label>
      </p>
    </div>

  </div>
</template>

<script>

export default {
  name: 'i18n',
  data: () => ({
    value: 1234.5,
    currency: 'EUR',
    locale: undefined,
  })
}
</script>
