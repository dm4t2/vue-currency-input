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

interface PrecisionOptions {
  min: number,
  max: number
}

interface CurrencyInputOptions {
  locale: string,
  currency: string | CurrencyOptions,
  valueAsInteger: boolean,
  distractionFree: boolean | DistractionFreeOptions,
  precision: number | PrecisionOptions,
  autoDecimalMode: boolean,
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

export function parseCurrency (formattedValue: string, options: CurrencyInputOptions): number

export function install (vue: typeof Vue, options: PluginOptions): void

declare module 'vue/types/vue' {
  interface Vue {
    $parseCurrency (formattedValue: string, options: CurrencyInputOptions): number
  }
}
