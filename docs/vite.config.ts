import { resolve } from 'path'
import { UserConfig } from 'vite'
import Components from 'vite-plugin-components'
import { VitePWA } from 'vite-plugin-pwa'
import WindiCSS from 'vite-plugin-windicss'

const config: UserConfig = {
  resolve: {
    alias: [{ find: 'vue-currency-input', replacement: resolve(__dirname, '../src/index.ts') }]
  },
  optimizeDeps: {
    exclude: ['vue-demi']
  },
  plugins: [
    Components({
      dirs: ['.vitepress/theme/components'],
      customLoaderMatcher: (id) => id.endsWith('.md')
    }),
    VitePWA({
      outDir: '.vitepress/dist',
      manifest: {
        name: 'Vue Currency Input',
        short_name: 'Vue Currency Input',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/favicon.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    }),
    WindiCSS()
  ]
}

export default config
