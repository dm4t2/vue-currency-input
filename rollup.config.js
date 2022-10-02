import typescript from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'
import cleanup from 'rollup-plugin-cleanup'
import filesize from 'rollup-plugin-filesize'
import pkg from './package.json'

const banner = `/**
 * Vue Currency Input ${pkg.version}
 * (c) 2018-${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */`

export default [
  {
    input: `src/index.ts`,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        banner
      },
      {
        file: pkg.module,
        format: 'es',
        exports: 'named',
        banner
      }
    ],
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false
          }
        }
      }),
      cleanup({ extensions: ['js', 'ts'] }),
      filesize()
    ],
    external: ['vue']
  },
  {
    input: './dist/types/src/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()]
  }
]
