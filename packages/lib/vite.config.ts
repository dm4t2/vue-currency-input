import { defineConfig } from 'vite'
import dtsPlugin from 'vite-plugin-dts'
import pkg from './package.json'

const banner = `/**
 * Vue Currency Input ${pkg.version}
 * (c) 2018-${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */`

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: 'src/index.ts',
      name: '@dm4t2/number-input-vue',
      // the proper extensions will be added
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        },
        banner
      }
    }
  },
  plugins: [dtsPlugin({ rollupTypes: true })],
  test: {
    globals: true,
    coverage: {
      all: true,
      reporter: ['lcov', 'text', 'json'],
      include: ['src'],
      provider: 'v8'
    }
  }
})
