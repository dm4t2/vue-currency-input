import vue from 'rollup-plugin-vue'
import commonjs from 'rollup-plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import buble from 'rollup-plugin-buble'
import resolve from 'rollup-plugin-node-resolve'
import clear from 'rollup-plugin-clear'
import { uglify } from 'rollup-plugin-uglify'
import pkg from './package.json'

export default [
  {
    input: 'src/plugin.js',
    output: {
      format: 'esm',
      file: pkg.module,
      exports: 'named'
    },
    plugins: [
      clear({
        targets: ['./dist']
      }),
      commonjs(),
      vue(),
      cleanup()
    ],
    external: ['vue', 'text-mask-core']
  },
  {
    input: 'src/plugin.js',
    output: {
      format: 'cjs',
      file: pkg.main,
      exports: 'named'
    },
    plugins: [
      commonjs(),
      vue(),
      cleanup()
    ],
    external: ['vue', 'text-mask-core']
  },
  {
    input: 'src/index.js',
    output: {
      name: 'VueCurrencyInput',
      format: 'iife',
      file: 'dist/vue-currency-input.js',
      globals: {
        vue: 'Vue'
      }
    },
    plugins: [
      commonjs({
        namedExports: {
          'node_modules/text-mask-core/dist/textMaskCore.js': ['createTextMaskInputElement']
        }
      }),
      resolve(),
      vue(),
      buble({
        objectAssign: true
      }),
      uglify()
    ],
    external: ['vue']
  }
]
