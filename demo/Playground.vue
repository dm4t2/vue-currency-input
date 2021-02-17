<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col
          class="d-flex"
          cols="12"
          sm="6"
        >
          <v-currency-field
            v-model="value"
            :options="options"
          />
        </v-col>
        <v-col
          class="d-flex align-center"
          cols="12"
          sm="6"
        >
          Number value: <code class="ml-2">{{ value != null ? value : 'null' }}</code>
        </v-col>
      </v-row>
      <v-divider class="my-4" />
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <span class="title">Locale</span>
          <v-select
            v-model="locale"
            :items="[{text: 'Default', value: undefined}, 'de-DE', 'de-CH', 'en-US', 'en-IN', 'nl-NL', 'sv-SE', 'fr-FR', 'es-ES', 'pt-PT', 'zh-ZH', 'ja-JP', 'ar-SA', 'fa-IR']"
            class="mb-12"
            hide-details
          />
          <span class="title">Currency</span>
          <v-select
            v-model="currency"
            :items="['EUR', 'USD', 'JPY', 'GBP', 'BRL', 'INR', 'CNY', 'JPY', 'SAR', 'IRR']"
            class="mb-12"
            hide-details
          />
          <div class="d-flex align-center justify-space-between">
            <span class="title">Use Grouping</span>
            <v-switch
              v-model="useGrouping"
              class="my-0"
              hide-details
            />
          </div>
          <div class="mt-4 mb-10">
            Whether to use grouping separators such as thousands/lakh/crore separators.
          </div>
          <div class="d-flex align-center justify-space-between">
            <span class="title">Distraction Free</span>
            <v-switch
              v-model="distractionFree"
              class="my-0"
              hide-details
            />
          </div>
          <div class="my-4">
            Enables easier input by hiding various parts of the formatting on focus.
          </div>
          <v-checkbox
            v-model="hideCurrencySymbol"
            :disabled="!distractionFree"
            class="my-0"
            hide-details
            label="Hide currency symbol"
          />
          <v-checkbox
            v-model="hideGroupingSymbol"
            :disabled="!distractionFree"
            class="my-0"
            hide-details
            label="Hide grouping symbol"
          />
          <v-checkbox
            v-model="hideNegligibleDecimalDigits"
            :disabled="!distractionFree"
            class="my-0"
            hide-details
            label="Hide negligible decimal digits"
          />
          <div class="d-flex align-center justify-space-between mt-8">
            <span class="title">Auto Sign</span>
            <v-switch v-model="autoSign" />
          </div>
          <div class="mb-6">
            Whether the minus symbol is automatically inserted or prevented to be inputted depending the current value range.
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <div class="d-flex align-center justify-space-between mb-4">
            <span class="title">Precision</span>
            <v-switch
              v-model="precisionEnabled"
              class="my-0"
              hide-details
            />
          </div>
          <div class="mb-6">
            Override the number of displayed decimal digits. Can only be applied for currencies that support decimal digits.
          </div>
          <v-switch
            v-model="precisionRangeEnabled"
            :disabled="!precisionEnabled"
            class="mb-8"
            hide-details
            label="Use range"
          />
          <v-range-slider
            v-if="precisionRangeEnabled"
            v-model="precisionRange"
            :disabled="!precisionEnabled"
            :max="15"
            thumb-label="always"
            thumb-size="24"
          />
          <v-slider
            v-else
            v-model="precisionFixed"
            :disabled="!precisionEnabled"
            :max="15"
            thumb-label="always"
            thumb-size="24"
          />
          <div class="d-flex align-center justify-space-between">
            <span class="title">Value Range</span>
            <v-switch v-model="valueRangeEnabled" />
          </div>
          <div class="mb-8">
            The validation is triggered on blur and automatically sets the respective threshold if out of range.
          </div>
          <v-range-slider
            v-model="valueRange"
            :disabled="!valueRangeEnabled"
            :max="1000"
            :min="-1000"
            thumb-label="always"
            thumb-size="24"
          />

          <div class="d-flex align-center justify-space-between">
            <span class="title">Auto Decimal Digits</span>
            <v-switch v-model="autoDecimalDigits" />
          </div>
          <div class="mb-6">
            Whether the decimal symbol is inserted automatically, using the last inputted digits as decimal digits.
          </div>

          <div class="d-flex align-center justify-space-between">
            <span class="title">Export Value As Integer</span>
            <v-switch v-model="exportValueAsInteger" />
          </div>
          <div class="mb-6">
            Whether the number value should be exported as integer instead of a float value depending the configured precision.
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import VCurrencyField from './VCurrencyField'

export default {
  name: 'Playground',
  components: { VCurrencyField },
  data () {
    return {
      value: 1234,
      locale: 'de-DE',
      currency: 'EUR',
      distractionFree: true,
      hideCurrencySymbol: true,
      hideGroupingSymbol: true,
      hideNegligibleDecimalDigits: true,
      precisionEnabled: false,
      precisionRangeEnabled: false,
      precisionFixed: 2,
      precisionRange: [0, 15],
      valueRangeEnabled: false,
      valueRange: [0, 9999],
      minActive: false,
      maxActive: false,
      autoDecimalDigits: false,
      exportValueAsInteger: false,
      autoSign: true,
      useGrouping: true
    }
  },
  computed: {
    options () {
      return {
        locale: this.locale,
        currency: this.currency,
        valueRange: this.valueRangeEnabled
          ? { min: this.valueRange[0], max: this.valueRange[1] }
          : undefined,
        precision: this.precisionEnabled
          ? (this.precisionRangeEnabled ? { min: this.precisionRange[0], max: this.precisionRange[1] } : this.precisionFixed)
          : undefined,
        distractionFree: this.distractionFree
          ? {
            hideNegligibleDecimalDigits: this.hideNegligibleDecimalDigits,
            hideCurrencySymbol: this.hideCurrencySymbol,
            hideGroupingSymbol: this.hideGroupingSymbol
          } : false,
        autoDecimalDigits: this.autoDecimalDigits,
        exportValueAsInteger: this.exportValueAsInteger,
        autoSign: this.autoSign,
        useGrouping: this.useGrouping
      }
    }
  }
}
</script>

<style lang="css" scoped>
@import '~@mdi/font/css/materialdesignicons.css';
@import '~vuetify/dist/vuetify.min.css';
@import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900");
</style>
