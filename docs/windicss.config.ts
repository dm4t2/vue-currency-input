import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  extract: {
    include: ['**/*.vue', '.vitepress/**/*.vue']
  },
  shortcuts: {
    'form-input':
      'transition-all ' +
      'disabled:(cursor-not-allowed border-gray-300 text-gray-300) ' +
      'shadow-sm rounded-md text-base ' +
      'focus:border-primary focus:ring focus:ring-offset-0 focus:ring-primary focus:ring-opacity-50',
    'form-select': 'cursor-pointer w-full'
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
