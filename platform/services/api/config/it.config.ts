import { URL, fileURLToPath } from 'url'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    exclude: [...configDefaults.exclude],
    include: ['./**/?(*.)spec.ts?(x)'],
    setupFiles: [
      './config/vitest.setup.ts',
      './config/GraphQLIdSerializer.ts',
      './config/GraphQLDateTimeSerializer.ts',
    ],
    allowOnly: true,
    globalSetup: ['./config/vitest.db.ts'],
    fileParallelism: false,
    alias: {
      config: fileURLToPath(new URL(__dirname, import.meta.url)),
    },
    resolveSnapshotPath: (testPath, snapExtension) => {
      const [basePath, relativePath] = testPath.split('src/')
      const relativePaths = relativePath?.split('/') ?? []
      const filename = relativePaths.pop()
      return basePath + 'config/__snapshots__/' + relativePaths.join('_') + '/' + filename + snapExtension
    },
  },
})
