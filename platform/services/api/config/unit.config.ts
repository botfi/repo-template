/// <reference types="vitest" />

import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [],
  test: {
    globals: true,
    environment: 'node',
    allowOnly: true,
    setupFiles: ['./config/vitest.setup.ts'],
    include: ['**/*.test.?(c|m)[jt]s?(x)'],
    exclude: [...configDefaults.exclude],
  },
})
