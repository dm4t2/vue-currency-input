<template>
  <div class="grid gap-y-4 md:grid-cols-2 md:gap-x-8 items-center mt-8 mb-4">
    <CurrencyInput
      v-if="lazy"
      v-model.lazy="value"
      :options="options"
      class="*form-input"
    />
    <CurrencyInput
      v-else
      v-model="value"
      :options="options"
      class="*form-input"
    />
    <div>
      Number value: <code class="ml-2">{{ value != null ? value : 'null' }}</code>
    </div>
  </div>
  <div class="mb-8">
    <Checkbox
      v-model="lazy"
      label="Use lazy value binding"
    />
  </div>
  <div class="flex items-center justify-between mb-2">
    <span class="text-2xl font-bold">Options</span>
    <div>
      <button
        class="transition-all bg-white hover:bg-gray-100 text-gray-800 font-semibold text-sm py-2 px-4 border border-gray-300 rounded shadow focus:outline-none focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
        @click="exportDialogVisible = true"
      >
        Export
      </button>
      <Dialog v-model="exportDialogVisible">
        <pre
          class="white--text m-0"
          style="margin: 0"
          >{{ stringifiedOptions }}</pre
        >
      </Dialog>
    </div>
  </div>
  <hr class="mb-8" />
  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8">
    <div>
      <OptionSection
        v-model="localeEnabled"
        label="Locale"
      >
        <select
          v-model="locale"
          :disabled="!localeEnabled"
          class="*form-input *form-select"
        >
          <option
            v-for="locale in locales"
            :key="locale"
          >
            {{ locale }}
          </option>
        </select>
      </OptionSection>
      <OptionSection label="Currency">
        <select
          v-model="currency"
          class="*form-input *form-select"
        >
          <option
            v-for="currency in currencies"
            :key="currency"
          >
            {{ currency }}
          </option>
        </select>
      </OptionSection>
      <OptionSection
        label="Currency Display"
        description="How to display the currency in the formatting."
      >
        <select
          v-model="currencyDisplay"
          class="*form-input *form-select"
        >
          <option
            v-for="currencyDisplay in currencyDisplays"
            :key="currencyDisplay.value"
            :value="currencyDisplay.value"
          >
            {{ currencyDisplay.label }}
          </option>
        </select>
      </OptionSection>
      <OptionSection
        v-model="accountingSign"
        label="Accounting Sign"
        description="Whether to use accounting sign formatting."
      />
      <OptionSection
        v-model="useGrouping"
        label="Use Grouping"
        description="Whether to use grouping separators such as thousands/lakh/crore separators."
      />
      <OptionSection
        label="Distraction Free Input"
        description="Hide various parts of the formatting on focus for easier input."
      >
        <Checkbox
          v-model="hideCurrencySymbolOnFocus"
          label="Hide currency symbol"
          class="mb-1"
        />
        <Checkbox
          v-model="hideGroupingSeparatorOnFocus"
          label="Hide grouping separator"
          class="mb-1"
        />
        <Checkbox
          v-model="hideNegligibleDecimalDigitsOnFocus"
          :disabled="!hideNegligibleDecimalDigitsOnFocusEnabled"
          label="Hide negligible decimal digits"
        />
      </OptionSection>
    </div>
    <div>
      <OptionSection
        v-model="valueRangeEnabled"
        label="Value Range"
        description="The validation is triggered on blur and automatically sets the respective threshold if out of range."
      >
        <div class="flex items-center space-x-4">
          <input
            v-model.lazy="minValue"
            :disabled="!valueRangeEnabled"
            type="number"
            placeholder="Min"
            class="*form-input min-w-0"
          />
          <span class="text-center">to</span>
          <input
            v-model.lazy="maxValue"
            :disabled="!valueRangeEnabled"
            type="number"
            placeholder="Max"
            class="*form-input min-w-0"
          />
        </div>
      </OptionSection>
      <OptionSection
        v-model="precisionEnabled"
        label="Precision"
        description="Override the number of displayed decimal digits. Can only be applied for currencies that support decimal digits."
      >
        <div>
          <Checkbox
            v-model="precisionRangeEnabled"
            label="Use range"
            :disabled="!precisionEnabled"
            class="mb-2"
          />
          <div
            v-if="precisionRangeEnabled"
            class="flex items-center space-x-4"
          >
            <select
              v-model="precisionRangeMinValue"
              :disabled="!precisionEnabled"
              class="*form-input *form-select"
            >
              <option
                v-for="value in precisionRangeMinOptions"
                :key="value"
                :value="value"
              >
                {{ value }}
              </option>
            </select>
            <span class="text-center">to</span>
            <select
              v-model="precisionRangeMaxValue"
              :disabled="!precisionEnabled"
              class="*form-input *form-select"
            >
              <option
                v-for="value in precisionRangeMaxOptions"
                :key="value"
                :value="value"
              >
                {{ value }}
              </option>
            </select>
          </div>
          <select
            v-else
            v-model="precision"
            :disabled="!precisionEnabled"
            class="*form-input *form-select"
          >
            <option
              v-for="value in precisionOptions"
              :key="value"
              :value="value"
            >
              {{ value }}
            </option>
          </select>
        </div>
      </OptionSection>
      <OptionSection
        v-model="valueScalingEnabled"
        label="Value Scaling"
        description="Applies a scaling on the exported value."
      >
        <select
          v-model="valueScaling"
          :disabled="!valueScalingEnabled"
          class="*form-input *form-select"
        >
          <option
            v-for="option in valueScalingOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </OptionSection>
      <OptionSection
        v-model="autoDecimalDigits"
        label="Auto Decimal Digits"
        description="Whether the decimal symbol is inserted automatically, using the last inputted digits as decimal digits."
      />
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable vue/no-reserved-component-names,vue/multi-word-component-names */
import { computed, defineComponent, reactive, toRefs, watch } from 'vue'
import CurrencyInput from './CurrencyInput.vue'
import Dialog from './Dialog.vue'
import OptionSection from './OptionSection.vue'
import Checkbox from './Checkbox.vue'

export default defineComponent({
  name: 'Demo',
  components: { Checkbox, OptionSection, Dialog, CurrencyInput },
  setup() {
    const range = (from: number, to: number) =>
      Array(to - from)
        .fill(from)
        .map((x, y) => x + y)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const state: any = reactive({
      exportDialogVisible: false,
      lazy: false,
      value: 1234.5,
      localeEnabled: false,
      locale: 'de-DE',
      locales: ['de-DE', 'de-CH', 'en-US', 'en-IN', 'nl-NL', 'sv-SE', 'fr-FR', 'es-ES', 'pt-PT', 'pt-BR', 'zh-ZH', 'ja-JP', 'ar-SA', 'fa-IR', 'bg-BG'],
      currency: 'EUR',
      currencyDisplay: 'symbol',
      currencies: ['EUR', 'USD', 'JPY', 'GBP', 'BRL', 'INR', 'CNY', 'JPY', 'SAR', 'IRR', 'BGN'],
      currencyDisplays: [
        { value: 'symbol', label: 'Symbol' },
        { value: 'narrowSymbol', label: 'Narrow symbol' },
        { value: 'code', label: 'Code' },
        { value: 'name', label: 'Name' },
        { value: 'hidden', label: 'Hidden' }
      ],
      valueScalingEnabled: false,
      valueScaling: 'precision',
      valueScalingOptions: [
        { value: 'precision', label: 'Precision' },
        { value: 'thousands', label: 'Thousands' },
        { value: 'millions', label: 'Millions' },
        { value: 'billions', label: 'Billions' }
      ],
      hideCurrencySymbolOnFocus: true,
      hideGroupingSeparatorOnFocus: true,
      hideNegligibleDecimalDigitsOnFocusEnabled: true,
      hideNegligibleDecimalDigitsOnFocus: true,
      precisionEnabled: false,
      precisionRangeEnabled: false,
      precisionRangeMinValue: 2,
      precisionRangeMaxValue: 5,
      precision: 2,
      precisionOptions: computed(() => range(1, 16)),
      precisionRangeMinOptions: computed(() => range(1, state.precisionRangeMaxValue + 1)),
      precisionRangeMaxOptions: computed(() => range(state.precisionRangeMinValue, 16)),
      valueRangeEnabled: false,
      minValue: undefined,
      maxValue: undefined,
      autoDecimalDigitsEnabled: true,
      autoDecimalDigits: false,
      accountingSign: false,
      useGrouping: true,
      options: computed(() => {
        return {
          locale: state.localeEnabled ? state.locale : undefined,
          currency: state.currency,
          currencyDisplay: state.currencyDisplay,
          valueRange: state.valueRangeEnabled
            ? {
                min: state.minValue === '' ? undefined : state.minValue,
                max: state.maxValue === '' ? undefined : state.maxValue
              }
            : undefined,
          precision: state.precisionEnabled
            ? state.precisionRangeEnabled
              ? { min: state.precisionRangeMinValue, max: state.precisionRangeMaxValue }
              : state.precision
            : undefined,
          hideCurrencySymbolOnFocus: state.hideCurrencySymbolOnFocus,
          hideGroupingSeparatorOnFocus: state.hideGroupingSeparatorOnFocus,
          hideNegligibleDecimalDigitsOnFocus: state.hideNegligibleDecimalDigitsOnFocus,
          autoDecimalDigits: state.autoDecimalDigits,
          valueScaling: state.valueScalingEnabled ? state.valueScaling : undefined,
          useGrouping: state.useGrouping,
          accountingSign: state.accountingSign
        }
      }),
      stringifiedOptions: computed(() => JSON.stringify(state.options, null, 2))
    })

    watch(
      () => state.autoDecimalDigits,
      (value) => {
        state.hideNegligibleDecimalDigitsOnFocusEnabled = !value
        state.hideNegligibleDecimalDigitsOnFocus = !value
      }
    )

    return toRefs(state)
  }
})
</script>

<style scoped></style>
