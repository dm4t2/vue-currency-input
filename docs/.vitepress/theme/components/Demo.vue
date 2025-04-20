<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import CurrencyInput from './CurrencyInput.vue'
import Dialog from './Dialog.vue'
import OptionSection from './OptionSection.vue'
import Checkbox from './Checkbox.vue'

const range = (from: number, to: number) =>
  Array(to - from)
    .fill(from)
    .map((x, y) => x + y)

const exportDialogVisible = ref(false)
const lazy = ref(false)
const value = ref('123')
const localeEnabled = ref(false)
const locale = ref('de-DE')
const currency = ref('EUR')
const currencyDisplay = ref('symbol')

const hideCurrencySymbolOnFocus = ref(true)
const hideGroupingSeparatorOnFocus = ref(true)
const hideNegligibleDecimalDigitsOnFocusEnabled = ref(true)
const hideNegligibleDecimalDigitsOnFocus = ref(true)
const precisionEnabled = ref(false)
const precisionRangeEnabled = ref(false)
const precisionRangeMinValue = ref(2)
const precisionRangeMaxValue = ref(5)
const precision = ref(2)
const precisionRangeMinOptions = computed(() => range(0, precisionRangeMaxValue.value + 1))
const precisionRangeMaxOptions = computed(() => range(precisionRangeMinValue.value, 30))
const valueRangeEnabled = ref(false)
const minValue = ref(undefined)
const maxValue = ref(undefined)
const autoDecimalDigits = ref(false)
const accountingSign = ref(false)
const useGrouping = ref(true)
const options = computed(() => {
  return {
    locale: localeEnabled.value ? locale.value : undefined,
    currency: currency.value,
    currencyDisplay: currencyDisplay.value,
    valueRange: valueRangeEnabled.value
      ? {
          min: minValue.value === '' ? undefined : minValue.value,
          max: maxValue.value === '' ? undefined : maxValue.value
        }
      : undefined,
    precision: precisionEnabled.value
      ? precisionRangeEnabled.value
        ? { min: precisionRangeMinValue.value, max: precisionRangeMaxValue.value }
        : precision.value
      : undefined,
    hideCurrencySymbolOnFocus: hideCurrencySymbolOnFocus.value,
    hideGroupingSeparatorOnFocus: hideGroupingSeparatorOnFocus.value,
    hideNegligibleDecimalDigitsOnFocus: hideNegligibleDecimalDigitsOnFocus.value,
    autoDecimalDigits: autoDecimalDigits.value,
    useGrouping: useGrouping.value,
    accountingSign: accountingSign.value
  }
})
const stringifiedOptions = computed(() => JSON.stringify(options.value, null, 2))

watch(autoDecimalDigits, (value) => {
  hideNegligibleDecimalDigitsOnFocusEnabled.value = !value
  hideNegligibleDecimalDigitsOnFocus.value = !value
})
</script>

<template>
  <div class="grid gap-y-4 md:grid-cols-2 md:gap-x-8 items-center mt-8 mb-4">
    <CurrencyInput
      v-if="lazy"
      v-model.number.lazy="value"
      :options="options"
      class="*form-input"
    />
    <CurrencyInput
      v-else
      v-model.number="value"
      :options="options"
      class="*form-input"
    />
    <div>
      Number value: <code class="ml-2">{{ value != null ? value.toString() : 'null' }}</code>
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
            v-for="item in [
              'de-DE',
              'de-CH',
              'en-US',
              'en-IN',
              'nl-NL',
              'sv-SE',
              'fr-FR',
              'es-ES',
              'pt-PT',
              'pt-BR',
              'zh-ZH',
              'ja-JP',
              'ar-SA',
              'fa-IR',
              'bg-BG'
            ]"
            :key="item"
          >
            {{ item }}
          </option>
        </select>
      </OptionSection>
      <OptionSection label="Currency">
        <select
          v-model="currency"
          class="*form-input *form-select"
        >
          <option
            v-for="item in ['EUR', 'USD', 'JPY', 'GBP', 'BRL', 'INR', 'CNY', 'JPY', 'SAR', 'IRR', 'BGN']"
            :key="item"
          >
            {{ item }}
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
            v-for="item in [
              { value: 'symbol', label: 'Symbol' },
              { value: 'narrowSymbol', label: 'Narrow symbol' },
              { value: 'code', label: 'Code' },
              { value: 'name', label: 'Name' },
              { value: 'hidden', label: 'Hidden' }
            ]"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
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
                v-for="item in precisionRangeMinOptions"
                :key="item"
                :value="item"
              >
                {{ item }}
              </option>
            </select>
            <span class="text-center">to</span>
            <select
              v-model="precisionRangeMaxValue"
              :disabled="!precisionEnabled"
              class="*form-input *form-select"
            >
              <option
                v-for="item in precisionRangeMaxOptions"
                :key="item"
                :value="item"
              >
                {{ item }}
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
              v-for="item in range(1, 16)"
              :key="item"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>
      </OptionSection>
      <OptionSection
        v-model="autoDecimalDigits"
        label="Auto Decimal Digits"
        description="Whether the decimal symbol is inserted automatically, using the last inputted digits as decimal digits."
      />
    </div>
  </div>
</template>
