<template>
  <div class="demo">
    <CurrencyInput
      v-model="value"
      :distraction-free="false"
      :hide-grouping-symbol="hideGroupingSymbol"
      class="demo__currency-input"/>
    <div class="demo__options">
      <p>
        <label>
          <input
            v-model="hideGroupingSymbol"
            type="checkbox">
          <span>Always hide grouping symbol</span>
        </label>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HideGroupingSymbol',
  data: () => ({
    value: 1234.5,
    hideGroupingSymbol: false
  })
}
</script>
