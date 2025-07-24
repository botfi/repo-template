/// <reference types="vitest" />

import tsconfigPaths from 'vite-tsconfig-paths'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    allowOnly: true,
    exclude: [...configDefaults.exclude],
    include: ['./spec/**/?(*.)spec.ts?(x)'],
    setupFiles: ['./config/vitest.setup.ts'],
    globalSetup: ['./config/vitest.db.ts'],
    fileParallelism: false,
  },
})
