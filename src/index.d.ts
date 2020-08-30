import { Component, DirectiveOptions, PluginFunction } from 'vue'

export interface CurrencyOptions {
  prefix?: string,
  suffix?: string
}

export interface DistractionFreeOptions {
  hideCurrencySymbol?: boolean,
  hideGroupingSymbol?: boolean,
  hideNegligibleDecimalDigits?: boolean
}

export interface NumberRange {
  min?: number,
  max?: number
}

export interface CurrencyInputOptions {
  locale?: string,
  currency?: string | CurrencyOptions,
  valueAsInteger?: boolean,
  distractionFree?: boolean | DistractionFreeOptions,
  precision?: number | NumberRange,
  autoDecimalMode?: boolean,
  valueRange?: NumberRange,
  allowNegative?: boolean
}

export interface PluginOptions {
  globalOptions?: CurrencyInputOptions,
  componentName?: string,
  directiveName?: string
}

export interface VueCurrencyInput {
  install: PluginFunction<PluginOptions>
}

declare const VueCurrencyInput: VueCurrencyInput

export default VueCurrencyInput

export const CurrencyDirective: DirectiveOptions

export const CurrencyInput: Component

export function parse (formattedValue: string, options: CurrencyInputOptions): number | null

export function getValue (el: HTMLInputElement): number | null

export function setValue (el: HTMLInputElement, value: Number): void

declare module 'vue/types/vue' {
  interface Vue {
    $ci: {
      globalOptions: CurrencyInputOptions

      parse (formattedValue: string, options: CurrencyInputOptions): number | null

      getValue (el: HTMLInputElement): number | null

      setValue (el: HTMLInputElement, value: Number): void
    }
  }
}
