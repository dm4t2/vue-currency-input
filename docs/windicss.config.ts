import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  extract: {
    include: ['**/*.vue', '.vitepress/**/*.vue']
  },
  alias: {
    'form-input': `shadow-sm rounded-md text-base transition-all disabled:(cursor-not-allowed border-gray-300 text-gray-300) focus:(border-primary ring ring-offset-0 ring-primary ring-opacity-50)`,
    'form-select': 'cursor-pointer w-full py-2 px-3'
  },
  theme: {
    extend: {
      colors: {
        primary: '#3eaf7c'
      }
    }
  },
  plugins: [require('windicss/plugin/forms')]
})
