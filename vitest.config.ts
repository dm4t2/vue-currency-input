import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      all: true,
      reporter: ['lcov', 'text', 'json'],
      include: ['src']
    }
  }
})
