import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { initContextCache } from '@pothos/core'
import { headers } from 'next/headers'
import { NextRequest } from 'next/server'

import { X_BOTFI_PREFIX } from '../utils'
import { type Context } from './definition'
import { schema } from './types'

/**
 * STEP 6: Create the server with the schema
 */
const server = new ApolloServer<Context>({
  schema,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: true, includeCookies: true })],
  introspection: true,
})

export const handler: (req: NextRequest) => Promise<Response> = startServerAndCreateNextHandler<NextRequest, Context>(
  server,
  {
    context: async () => {
      const zHeaders: Record<string, string> = {}
      const existingHeaders = await headers()
      existingHeaders.forEach((value, key) => {
        if (key.toLowerCase().startsWith(X_BOTFI_PREFIX)) {
          zHeaders[key] = value
        }
      })
      return {
        // Adding this will prevent any issues if you server implementation
        // copies or extends the context object before passing it to your resolvers
        ...initContextCache(),
        headers: zHeaders,
      }
    },
  },
)

export async function GET(request: NextRequest) {
  return handler(request)
}

export async function POST(request: NextRequest) {
  return handler(request)
}
