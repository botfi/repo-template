import { ApolloServer, GraphQLResponse } from '@apollo/server'
import { env } from '@botfi/env/main'

import { schema as graphSchema } from '../src/graph'
import { Context as GraphContext } from '../src/graph/definition'
import { schema as internalSchema } from '../src/internal'
import { Context as InternalContext } from '../src/internal/definition'
import { X_BOTFI_INTERNAL_API_KEY } from '../src/utils'

type Server = 'graph' | 'internal'

export const constructTestServer = async (
  sub: string,
  headers?: Record<string, string>,
): Promise<{ server: ApolloServer<GraphContext>; context: GraphContext }> => {
  const graph = new ApolloServer<GraphContext>({ schema: graphSchema })
  return { server: graph, context: { headers: { ...headers }, sub } satisfies GraphContext }
}

export const constructTestInternalServer = async (
  headers: Record<string, string> = {
    [X_BOTFI_INTERNAL_API_KEY]: env.INTERNAL_API_KEY,
  },
): Promise<{
  server: ApolloServer<InternalContext>
  context: InternalContext
}> => {
  const internal = new ApolloServer<InternalContext>({ schema: internalSchema })
  return { server: internal, context: { headers: { ...headers } } satisfies InternalContext }
}

export const extractSingleResult = (res: GraphQLResponse<Record<string, any>>) => {
  return res.body.kind === 'single' ? res.body.singleResult : res.body.initialResult
}
