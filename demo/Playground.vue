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
      <v-divider class="my-6" />
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <div class="mb-12">
            <span class="title">Locale</span>
            <v-select
              v-model="locale"
              :items="[{text: 'Default', value: undefined}, 'de-DE', 'de-CH', 'en-US', 'en-IN', 'nl-NL', 'sv-SE', 'fr-FR', 'es-ES', 'pt-PT', 'zh-ZH', 'ja-JP', 'ar-SA', 'fa-IR']"
              hide-details
            />
          </div>
          <div class="mb-12">
            <span class="title">Currency</span>
            <v-select
              v-model="currency"
              :items="['EUR', 'USD', 'JPY', 'GBP', 'BRL', 'INR', 'CNY', 'JPY', 'SAR', 'IRR']"
              hide-details
            />
          </div>
          <div class="mb-12">
            <div class="d-flex align-center justify-space-between">
              <span class="title">Use Grouping</span>
              <v-switch
                v-model="useGrouping"
                class="my-0"
                hide-details
              />
            </div>
            <div class="mt-4">
              Whether to use grouping separators such as thousands/lakh/crore separators.
            </div>
          </div>
          <div class="mb-12">
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
              :disabled="!distractionFree || !hideNegligibleDecimalDigitsEnabled"
              class="my-0"
              hide-details
              label="Hide negligible decimal digits"
            />
          </div>
          <div class="mb-12">
            <div class="d-flex align-center justify-space-between">
              <span class="title">Auto Sign</span>
              <v-switch
                v-model="autoSign"
                class="my-0"
                hide-details
              />
            </div>
            <div class="mt-4 mb-6">
              Whether the minus symbol is automatically inserted or prevented to be inputted depending the current value range.
            </div>
            <div class="d-flex align-center justify-space-between">
              <span class="title">Value Range</span>
              <v-switch v-model="valueRangeEnabled" />
            </div>
            <div class="mb-6">
              The validation is triggered on blur and automatically sets the respective threshold if out of range.
            </div>
            <v-range-slider
              v-model="valueRange"
              :disabled="!valueRangeEnabled"
              :max="1000"
              :min="-1000"
              hide-details
              thumb-label="always"
              thumb-size="24"
            />
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <div class="mb-12">
            <div class="d-flex align-center justify-space-between">
              <span class="title">Precision</span>
              <v-switch
                v-model="precisionEnabled"
                class="my-0"
                hide-details
              />
            </div>
            <div class="mt-4 mb-6">
              Override the number of displayed decimal digits. Can only be applied for currencies that support decimal digits.
            </div>
            <v-slider
              v-model="precision"
              :disabled="!precisionEnabled"
              :max="15"
              hide-details
              thumb-label="always"
              thumb-size="24"
            />
          </div>

          <div class="mb-12">
            <div class="d-flex align-center justify-space-between">
              <span class="title">Decimal Digits Replacement</span>
              <v-switch
                v-model="decimalDigitsReplacementEnabled"
                class="my-0"
                hide-details
              />
            </div>
            <div class="mt-4">
              Replaces decimal digits with a custom string. Only applies for integer numbers.
            </div>
            <v-text-field
              v-model="decimalDigitsReplacement"
              hide-details
            />
          </div>

          <div class="mb-12">
            <div class="d-flex align-center justify-space-between">
              <span class="title">Auto Decimal Digits</span>
              <v-switch
                v-model="autoDecimalDigits"
                :disabled="!autoDecimalDigitsEnabled"
                class="my-0"
                hide-details
              />
            </div>
            <div class="mt-4">
              Whether the decimal symbol is inserted automatically, using the last inputted digits as decimal digits.
            </div>
          </div>

          <div class="mb-12">
            <div class="d-flex align-center justify-space-between">
              <span class="title">Export Value As Integer</span>
              <v-switch
                v-model="exportValueAsInteger"
                class="my-0"
                hide-details
              />
            </div>
            <div class="mt-4">
              Whether the number value should be exported as integer instead of a float value depending the configured precision.
            </div>
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
      value: 1234.5,
      locale: 'de-DE',
      currency: 'EUR',
      distractionFree: true,
      hideCurrencySymbol: true,
      hideGroupingSymbol: true,
      hideNegligibleDecimalDigitsEnabled: true,
      hideNegligibleDecimalDigits: true,
      precisionEnabled: false,
      precision: 2,
      decimalDigitsReplacementEnabled: false,
      decimalDigitsReplacement: '—',
      valueRangeEnabled: false,
      valueRange: [0, 9999],
      minActive: false,
      maxActive: false,
      autoDecimalDigitsEnabled: true,
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
          ? this.precision
          : undefined,
        decimalDigitsReplacement: this.decimalDigitsReplacementEnabled ? this.decimalDigitsReplacement : undefined,
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
  },
  watch: {
    decimalDigitsReplacementEnabled (value) {
      this.autoDecimalDigitsEnabled = !value
      if (value) {
        this.autoDecimalDigits = false
      }
    },
    autoDecimalDigits (value) {
      this.hideNegligibleDecimalDigitsEnabled = !value
      this.hideNegligibleDecimalDigits = !value
    }
  }
}
</script>

<style lang="css" scoped>
@import '~@mdi/font/css/materialdesignicons.css';
@import '~vuetify/dist/vuetify.min.css';
@import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900");
</style>
