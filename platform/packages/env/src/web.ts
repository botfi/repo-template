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
    INTERNAL_API_KEY: z.string().describe('The API key to allow access to the internal API'),
    SUBGRAPH_ENDPOINT__FEDERATED_WEB: z
      .string()
      .default('http://web-repo-template.botfi.localhost:15000/api/graphql/federated')
      .describe('The endpoint of the WEB federated subgraph. It is used to allow other apps to access the federated data.'),
    SUBGRAPH_ENDPOINT__GRAPH_WEB: z
      .string()
      .default('http://web-repo-template.botfi.localhost:15000/api/graphql/graph')
      .describe('The endpoint of the WEB graph subgraph. It is used as the graph endpoint for the WEB app.'),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_URL: z.string().url().default('http://web-repo-template.botfi.localhost:15000'),
    NEXT_PUBLIC_ENV: z.enum(['local', 'preview', 'staging', /* 'canary', */ 'production']).default('local'),
    NEXT_PUBLIC_RELEASE_VERSION: z.string().default('debug'),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    INTERNAL_API_KEY: process.env.INTERNAL_API_KEY_WEB ?? process.env.INTERNAL_API_KEY,
    SUBGRAPH_ENDPOINT__FEDERATED_WEB: process.env.SUBGRAPH_ENDPOINT__FEDERATED_WEB,
    SUBGRAPH_ENDPOINT__GRAPH_WEB: process.env.SUBGRAPH_ENDPOINT__GRAPH_WEB,

    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL_WEB ?? process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV_WEB ?? process.env.NEXT_PUBLIC_ENV,
    NEXT_PUBLIC_RELEASE_VERSION: process.env.NEXT_PUBLIC_RELEASE_VERSION,
  },
  skipValidation: false,
  emptyStringAsUndefined: false,
})
