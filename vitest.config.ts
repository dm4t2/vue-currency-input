import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      all: true,
      reporter: ['lcov', 'text', 'json'],
      include: ['src']
    }
  }
})
