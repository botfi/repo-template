import { ApolloServer, GraphQLResponse } from '@apollo/server'
import { env } from '@botfi/env/main'

import { type DocumentNode } from 'graphql'
import { schema as graphSchema } from '../src/graph'
import { Context as GraphContext } from '../src/graph/definition'
import { schema as internalSchema } from '../src/internal'
import { Context as InternalContext } from '../src/internal/definition'
import { X_BOTFI_INTERNAL_API_KEY } from '../src/utils'

type Server = 'graph' | 'internal'

// Overload: with query
export async function constructTestServer(
  sub: string | null | undefined,
  opts: { query: DocumentNode; headers?: Record<string, string> },
): Promise<{ server: ApolloServer<GraphContext>; context: GraphContext; result: Record<string, any> }>
// Overload: without query
export async function constructTestServer(
  sub?: string | null,
  opts?: { query?: undefined; headers?: Record<string, string> },
): Promise<{ server: ApolloServer<GraphContext>; context: GraphContext; result: undefined }>

export async function constructTestServer(
  sub?: string | null,
  { query, headers }: { query?: DocumentNode; headers?: Record<string, string> } = {
    query: undefined,
    headers: {},
  },
): Promise<
  | { server: ApolloServer<GraphContext>; context: GraphContext; result: Record<string, any> }
  | { server: ApolloServer<GraphContext>; context: GraphContext; result: undefined }
> {
  const server = new ApolloServer<GraphContext>({ schema: graphSchema })
  const context = { headers: { ...headers }, sub: sub as string } satisfies GraphContext

  if (query) {
    const res = await server.executeOperation({ query }, { contextValue: context })
    const result = extractSingleResult(res)
    return {
      server,
      context,
      result,
    }
  }
  return {
    server,
    context,
    result: undefined,
  }
}

// Overload: with query
export async function constructTestInternalServer(opts?: {
  apiKey?: string
  query: DocumentNode
  headers?: Record<string, string>
}): Promise<{ server: ApolloServer<InternalContext>; context: InternalContext; result: Record<string, any> }>
// Overload: without query
export async function constructTestInternalServer(opts?: {
  apiKey?: string
  query?: undefined
  headers?: Record<string, string>
}): Promise<{ server: ApolloServer<InternalContext>; context: InternalContext; result: undefined }>
// Implementation
export async function constructTestInternalServer(
  opts: { apiKey?: string; query?: DocumentNode; headers?: Record<string, string> } = {},
): Promise<
  | { server: ApolloServer<InternalContext>; context: InternalContext; result: Record<string, any> }
  | { server: ApolloServer<InternalContext>; context: InternalContext; result: undefined }
> {
  const apiKey = typeof opts.apiKey === 'undefined' ? env.INTERNAL_API_KEY : opts.apiKey
  const { query, headers = { [X_BOTFI_INTERNAL_API_KEY]: apiKey } } = opts
  const internal = new ApolloServer<InternalContext>({ schema: internalSchema })
  const context = { headers: { ...headers } } satisfies InternalContext
  if (query) {
    const res = await internal.executeOperation({ query }, { contextValue: context })
    const result = extractSingleResult(res)
    return { server: internal, context, result }
  }
  return { server: internal, context, result: undefined }
}

export const extractSingleResult = (res: GraphQLResponse<Record<string, any>>) => {
  return res.body.kind === 'single' ? res.body.singleResult : res.body.initialResult
}

export { gql } from 'graphql-tag'
