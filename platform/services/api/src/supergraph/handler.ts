import { getStitchedSchemaFromSupergraphSdl } from '@graphql-tools/federation'
import { createYoga } from 'graphql-yoga'
import { NextRequest } from 'next/server'

import { X_BOTFI_AUTHORIZATION, X_BOTFI_INTERNAL_API_KEY } from '../utils'

interface NextContext {
  params: Promise<Record<string, string>>
}

export const createHandler = (graphqlEndpoint: string = '/api/graphql/supergraph', supergraphSdl: string) => {
  const stitchedSchema = getStitchedSchemaFromSupergraphSdl({
    supergraphSdl,
    httpExecutorOpts: {
      headers(executionRequest) {
        const zHeaders: Record<string, string> = {
          cookie: executionRequest?.context?.request?.headers.get('cookie') ?? '',
          [X_BOTFI_AUTHORIZATION]: executionRequest?.context?.request?.headers.get(X_BOTFI_AUTHORIZATION) ?? '',
          [X_BOTFI_INTERNAL_API_KEY]: executionRequest?.context?.request?.headers.get(X_BOTFI_INTERNAL_API_KEY) ?? '',
        }
        return zHeaders
      },
    },
  })

  const yoga = createYoga<NextContext>({
    schema: stitchedSchema,
    graphqlEndpoint,
    fetchAPI: { Response },
    graphiql: {
      title: '[BF] MAIN Supergraph',
      defaultQuery: `query Hello {\n\thello\n}`,
    },
    logging: 'debug',
  })

  const GET = (req: NextRequest) => yoga(req)
  const POST = (req: NextRequest) => yoga(req)
  const OPTIONS = (req: NextRequest) => yoga(req)

  return { GET, POST, OPTIONS }
}
