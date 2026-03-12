import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'
import { env as baseEnv } from './env'

export const env = createEnv({
  extends: [baseEnv],
  server: {
    DB_URL: z.string().url().describe('The connection URL for the database (may go through a connection pooler)'),
    DB_DIRECT_URL: z.string().url().optional().describe('The direct connection URL for the database (bypasses connection pooler)'),
  },
  runtimeEnv: {
    DB_URL: process.env.DB_URL,
    DB_DIRECT_URL: process.env.DB_DIRECT_URL,
  },
  skipValidation: false,
  emptyStringAsUndefined: true,
})
