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
        <v-col cols=6 sm="6">
          <span class="title">Locale</span>
          <v-select
            v-model="locale"
            :items="['de', 'en']"
          />
          <span class="title">Currency</span>
          <v-radio-group v-model="selectedCurrencyOption" column class="full-width">
            <v-radio label="Use ISO code"/>
            <v-select
              :disabled="selectedCurrencyOption !== 0"
              class="pl-8"
              dense
              v-model="currency"
              :items="['EUR', 'USD']"
            />
            <v-radio label="Hide currency symbol"/>
            <v-radio label="Use custom currency symbol"/>
            <div class="pl-8">
              <v-text-field dense placeholder="Prefix" :disabled="selectedCurrencyOption !== 2" v-model="prefix"/>
              <v-text-field dense placeholder="Suffix" :disabled="selectedCurrencyOption !== 2" v-model="suffix"/>
            </div>
          </v-radio-group>
        </v-col>
        <v-col cols=6 sm="6">
          <span class="title">Value Range</span>

          <div class="d-flex align-center mt-6">
            <v-checkbox hide-details label="Min" class="my-0 py-0 mr-4" v-model="minActive"/>
            <v-slider hide-details class="align-center" v-model="valueRange.min" :disabled="!minActive" :max="maxActive && valueRange.max ? valueRange.max : 1000" thumb-label="always">

            </v-slider>
          </div>

          <div class="d-flex align-center mt-6">
            <v-checkbox hide-details label="Max" class="my-0 py-0 mr-4" v-model="maxActive"/>
            <v-slider hide-details class="align-center" v-model="valueRange.max" :disabled="!maxActive" :min="maxActive && valueRange.min ? valueRange.min : 0" :max="1000" thumb-label="always">

            </v-slider>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" sm="6">
          <span class="title">Distraction free</span>
          <v-switch v-model="distractionFree" :label="distractionFree ? 'Enabled' : 'Disabled'">
            <v-tooltip slot="append" top>
              <template v-slot:activator="data">
                <v-icon v-on="data.on">mdi-help-circle-outline</v-icon>
              </template>
              <span>Tooltip</span>
            </v-tooltip>
          </v-switch>
          <v-checkbox :disabled="!distractionFree" hide-details class="my-0" v-model="hideCurrencySymbol" label="Hide currency symbol"/>
          <v-checkbox :disabled="!distractionFree" hide-details class="my-0" v-model="hideGroupingSymbol" label="Hide grouping symbol"/>
          <v-checkbox :disabled="!distractionFree" hide-details class="my-0" v-model="hideNegligibleDecimalDigits" label="Hide negligible decimal digits"/>
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
      locale: 'en',
      selectedCurrencyOption: 0,
      currencyCode: 'EUR',
      distractionFree: false,
      hideCurrencySymbol: true,
      hideGroupingSymbol: true,
      hideNegligibleDecimalDigits: true,
      prefix: null,
      suffix: null,
      valueRange: {
        min: null,
        max: null
      },
      minActive: false,
      maxActive: false
    }
  },
  computed: {
    currency () {
      return [this.currencyCode, null, { prefix: this.prefix, suffix: this.suffix }][this.selectedCurrencyOption]
    },
    options () {
      return {
        locale: this.locale,
        currency: this.currency,
        min: this.minActive && Number.isInteger(this.valueRange.min) ? this.valueRange.min : null,
        max: this.maxActive && Number.isInteger(this.valueRange.max) ? this.valueRange.max : null,
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

.full-width /deep/ .v-input__control {
  width: 100%;
}
</style>
