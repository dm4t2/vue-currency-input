<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col class="d-flex" cols="12" sm="6">
          <currency-input
            v-model="value"
            v-bind="options"
            class="demo__currency-input"/>
        </v-col>
        <v-col class="d-flex align-center" cols="12" sm="6">
          Number value: <code class="ml-2">{{ value }}</code>
        </v-col>
      </v-row>

      <v-divider class="my-4"/>
      <v-row>
        <v-col class="d-flex" cols="12" sm="6">
          <v-select
            dense
            v-model="currency"
            :items="['EUR', 'USD']"
            label="Currency"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <span class="title">Distraction free</span>
          <v-switch v-model="distractionFree" :label="distractionFree ? 'Enabled' : 'Disabled'">
            <v-tooltip slot="append" top>
              <template v-slot:activator="data">
                <v-icon v-on="data.on">mdi-help-circle-outline</v-icon>
              </template>
              <span>Tooltip</span>
            </v-tooltip>
          </v-switch>
          <v-checkbox :disabled="!distractionFree" dense hide-details class="my-0" v-model="hideCurrencySymbolOnFocus" label="Hide currency symbol"/>
          <v-checkbox :disabled="!distractionFree" dense hide-details class="my-0" v-model="hideGroupingSymbolOnFocus" label="Hide grouping symbol"/>
          <v-checkbox :disabled="!distractionFree" dense hide-details class="my-0" v-model="hideNegligibleDecimalDigits" label="Hide negligible decimal digits"/>
        </v-col>
      </v-row>
    </v-container>
  </v-app>

</template>

<script>
export default {
  name: 'Playground',
  data () {
    return {
      value: 1234,
      currency: 'EUR',
      distractionFree: false,
      hideCurrencySymbolOnFocus: true,
      hideGroupingSymbolOnFocus: true,
      hideNegligibleDecimalDigits: true
    }
  },
  computed: {
    options () {
      return {
        currency: this.currency,
        distractionFree: this.distractionFree
          ? {
            hideNegligibleDecimalDigits: this.hideNegligibleDecimalDigits,
            hideCurrencySymbol: this.hideCurrencySymbol,
            hideGroupingSymbol: this.hideGroupingSymbol
          } : false
      }
    }
  },
}
</script>

<style scoped>
.demo__currency-input {
  background-color: #fff;
  font-size: 20px;
  padding: 4px 8px;
  width: 100%;
  box-sizing: border-box;
  border: thin solid rgba(0, 0, 0, .42);
  border-radius: 4px;
}
</style>
