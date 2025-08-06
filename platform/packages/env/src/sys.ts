import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'
import { env as baseEnv } from './env'

export const env = createEnv({
  extends: [baseEnv],
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_URL: z.string().url().default('http://sys-repo-template.botfi.localhost:15999'),
    NEXT_PUBLIC_ENV: z.enum(['local', 'preview', 'staging', /* 'canary', */ 'production']).default('local'),
    NEXT_PUBLIC_RELEASE_VERSION: z.string().default('debug'),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url().describe('The URL of the Supabase database'),
    NEXT_PUBLIC_SUPABASE_KEY: z.string().describe('The key of the Supabase database'),
    NEXT_PUBLIC_SUPABASE_SCHEMA: z.string().describe('The schema of the Supabase database').default('public'),
    NEXT_PUBLIC_REFINE_PROJECT_ID: z.string().describe('The project ID of the Refine project').default('refine-it-yourself'),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL_SYS ?? process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    NEXT_PUBLIC_RELEASE_VERSION: process.env.NEXT_PUBLIC_RELEASE_VERSION,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    NEXT_PUBLIC_SUPABASE_SCHEMA: process.env.NEXT_PUBLIC_SUPABASE_SCHEMA,
    NEXT_PUBLIC_REFINE_PROJECT_ID: process.env.NEXT_PUBLIC_REFINE_PROJECT_ID,
  },
  skipValidation: false,
  emptyStringAsUndefined: false,
})
