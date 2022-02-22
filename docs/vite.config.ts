import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  optimizeDeps: {
    exclude: ['vue-demi']
  },
  plugins: [
    Components({
      dirs: ['.vitepress/theme/components'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
    }),
    WindiCSS()
  ]
})
