import Vue, { Component, DirectiveOptions } from 'vue'

interface CurrencyOptions {
  prefix: string,
  suffix: string
}

interface DistractionFreeOptions {
  hideCurrencySymbol: boolean,
  hideGroupingSymbol: boolean,
  hideNegligibleDecimalDigits: boolean
}

interface CurrencyInputOptions {
  locale: string,
  currency: string | CurrencyOptions,
  autoDecimalMode: boolean,
  distractionFree: boolean | DistractionFreeOptions,
  valueAsInteger: boolean,
  min: number,
  max: number
}

interface PluginOptions {
  globalOptions: CurrencyInputOptions,
  componentName: string,
  directiveName: string
}

export const CurrencyDirective: DirectiveOptions

export const CurrencyInput: Component

export function parseCurrency (formattedValue: string, locale: string, currency: string | CurrencyOptions, valueAsInteger: boolean): number

export function install (vue: typeof Vue, options: PluginOptions): void

declare module 'vue/types/vue' {
  interface Vue {
    $parseCurrency (formattedValue: string, locale: string, currency: string | CurrencyOptions, valueAsInteger: boolean): number
  }
}
