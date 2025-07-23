/// <reference types="vitest" />

import tsconfigPaths from 'vite-tsconfig-paths'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    allowOnly: true,
    include: ['./spec/**/?(*.)test.ts?(x)'],
    exclude: [...configDefaults.exclude],
  },
})
