import { env } from '@botfi/env/db'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx ./seeds/development.ts',
  },
  datasource: {
    url: env.DB_URL,
  },
})
