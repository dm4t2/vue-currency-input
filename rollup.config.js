import buble from 'rollup-plugin-buble'
import cleanup from 'rollup-plugin-cleanup'
import clear from 'rollup-plugin-clear'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'

const banner =
  `/**
 * Vue Currency Input ${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */`

export default [
  {
    input: 'src/plugin.js',
    output: {
      format: 'esm',
      file: pkg.module,
      exports: 'named',
      banner
    },
    plugins: [
      clear({
        targets: ['./dist']
      }),
      commonjs(),
      buble({
        objectAssign: true
      }),
      cleanup()
    ],
    external: ['vue', 'text-mask-core']
  },
  {
    input: 'src/index.js',
    output: {
      name: 'VueCurrencyInput',
      format: 'umd',
      exports: 'named',
      file: pkg.main,
      globals: {
        vue: 'Vue'
      },
      banner
    },
    plugins: [
      commonjs({
        namedExports: {
          'node_modules/text-mask-core/dist/textMaskCore.js': ['createTextMaskInputElement']
        }
      }),
      resolve(),
      buble({
        objectAssign: true
      }),
      cleanup()
    ],
    external: ['vue']
  }
]
