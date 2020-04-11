<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col
          class="d-flex"
          cols="12"
          sm="6"
        >
          <currency-input
            v-model="value"
            v-bind="options"
            class="demo__currency-input"
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
      <v-divider class="my-4"/>
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
          <v-radio-group
            class="full-width mb-12"
            column
            hide-details
            v-model="selectedCurrencyOption"
          >
            <v-radio label="Use ISO code"/>
            <v-select
              :items="['EUR', 'USD', 'JPY', 'GBP', 'BRL', 'INR', 'CNY', 'JPY', 'SAR', 'IRR']"
              :disabled="selectedCurrencyOption !== 0"
              class="pl-8 mb-6 py-0"
              hide-details
              v-model="currencyCode"
            />
            <v-radio label="Hide currency symbol"/>
            <v-radio label="Use custom currency symbol"/>
            <div class="pl-8">
              <v-text-field
                :disabled="selectedCurrencyOption !== 2"
                class="py-0"
                hide-details
                placeholder="Prefix"
                v-model="prefix"
              />
              <v-text-field
                :disabled="selectedCurrencyOption !== 2"
                hide-details
                placeholder="Suffix"
                v-model="suffix"
              />
            </div>
          </v-radio-group>

          <div class="d-flex align-center justify-space-between">
            <span class="title">Distraction Free</span>
            <v-switch
              class="my-0"
              hide-details
              v-model="distractionFree"
            />
          </div>
          <div class="my-4">
            Enables easier input by hiding various parts of the formatting on focus.
          </div>
          <v-checkbox
            :disabled="!distractionFree"
            class="my-0"
            hide-details
            label="Hide currency symbol"
            v-model="hideCurrencySymbol"
          />
          <v-checkbox
            :disabled="!distractionFree"
            class="my-0"
            hide-details
            label="Hide grouping symbol"
            v-model="hideGroupingSymbol"
          />
          <v-checkbox
            :disabled="!distractionFree"
            class="my-0"
            hide-details
            label="Hide negligible decimal digits"
            v-model="hideNegligibleDecimalDigits"
          />
        </v-col>
        <v-col
          cols=12
          sm="6"
        >
          <div class="d-flex align-center justify-space-between mb-4">
            <span class="title">Precision</span>
            <v-switch
              class="my-0"
              hide-details
              v-model="precisionEnabled"
            />
          </div>
          <div class="mb-6">
            Override the number of displayed decimal digits. Can only be applied for currencies that support decimal digits.
          </div>
          <v-switch
            :disabled="!precisionEnabled"
            class="mb-8"
            hide-details
            label="Use range"
            v-model="precisionRangeEnabled"
          />
          <v-range-slider
            :disabled="!precisionEnabled"
            :max="20"
            thumb-label="always"
            thumb-size="24"
            v-if="precisionRangeEnabled"
            v-model="precisionRange"
          />
          <v-slider
            :disabled="!precisionEnabled"
            :max="20"
            thumb-label="always"
            thumb-size="24"
            v-else
            v-model="precisionFixed"
          />

          <div class="d-flex align-center justify-space-between">
            <span class="title">Allow Negative</span>
            <v-switch v-model="allowNegative"/>
          </div>
          <div class="mb-6">
            Whether the input of negative values is allowed.
          </div>

          <div class="d-flex align-center justify-space-between">
            <span class="title">Value Range</span>
            <v-switch v-model="valueRangeEnabled"/>
          </div>
          <div class="mb-8">The validation is triggered on blur and automatically sets the respective threshold if out of range.</div>
          <v-range-slider
            :disabled="!valueRangeEnabled"
            :max="999"
            thumb-label="always"
            thumb-size="24"
            v-model="valueRange"
          />

          <div class="d-flex align-center justify-space-between">
            <span class="title">Auto Decimal Mode</span>
            <v-switch v-model="autoDecimalMode"/>
          </div>
          <div class="mb-6">
            Whether the decimal symbol is inserted automatically, using the last inputted digits as decimal digits.
          </div>

          <div class="d-flex align-center justify-space-between">
            <span class="title">Value As Integer</span>
            <v-switch v-model="valueAsInteger"/>
          </div>
          <div class="mb-6">
            Whether the number value should be handled as integer instead of a float value.
          </div>
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
      locale: 'de-DE',
      selectedCurrencyOption: 0,
      currencyCode: 'EUR',
      distractionFree: true,
      hideCurrencySymbol: true,
      hideGroupingSymbol: true,
      hideNegligibleDecimalDigits: true,
      prefix: null,
      suffix: null,
      precisionEnabled: false,
      precisionRangeEnabled: false,
      precisionFixed: 2,
      precisionRange: [0, 20],
      valueRangeEnabled: false,
      valueRange: [0, 9999],
      minActive: false,
      maxActive: false,
      autoDecimalMode: false,
      valueAsInteger: false,
      allowNegative: true
    }
  },
  computed: {
    options () {
      return {
        locale: this.locale,
        currency: [this.currencyCode, null, { prefix: this.prefix, suffix: this.suffix }][this.selectedCurrencyOption],
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
        autoDecimalMode: this.autoDecimalMode,
        valueAsInteger: this.valueAsInteger,
        allowNegative: this.allowNegative
      }
    }
  }
}
</script>

<style
  lang="scss"
  scoped
>
@import '~@mdi/font/css/materialdesignicons.css';
@import '~vuetify/dist/vuetify.min.css';
@import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900");

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
