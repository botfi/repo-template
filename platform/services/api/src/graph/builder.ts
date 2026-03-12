import { prisma } from '@botfi/db'
import type PrismaTypes from '@botfi/db/graphql'
import { getDatamodel } from '@botfi/db/graphql'
import { env } from '@botfi/env/web'
import SchemaBuilder from '@pothos/core'
import DirectivePlugin from '@pothos/plugin-directives'
import FederationPlugin from '@pothos/plugin-federation'
import PrismaPlugin from '@pothos/plugin-prisma'
import ScopeAuthPlugin from '@pothos/plugin-scope-auth'
import ZodPlugin from '@pothos/plugin-zod'
import { GraphQLError } from 'graphql'

import type { Context } from './definition'

/**
 * STEP 1: Define the builder
 */
const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
  Context: Context
  AuthScopes: {
    auth: boolean
  }
  DefaultAuthStrategy: 'all'
  Scalars: {
    ID: {
      Output: string
      Input: string
    }
    DateTime: {
      Output: Date
      Input: Date
    }
    JSON: {
      Input: unknown
      Output: unknown
    }
  }
  DefaultFieldNullability: false
}>({
  plugins: [DirectivePlugin, PrismaPlugin, ZodPlugin, ScopeAuthPlugin, FederationPlugin],
  scopeAuth: {
    defaultStrategy: 'all',
    authScopes: async (context) => ({
      auth: !!context.sub,
    }),
    unauthorizedError: (_, __, { path, fieldNodes }, result) => {
      return new GraphQLError(result.message ?? 'Unauthorized', {
        path: [path.typename, path.key].filter(Boolean) as (string | number)[],
        nodes: fieldNodes,
        extensions: {
          code: 'UNAUTHORIZED',
        },
      })
    },
  },
  prisma: {
    client: prisma,
    dmmf: getDatamodel(),
    filterConnectionTotalCount: true,
    onUnusedQuery: env.NODE_ENV === 'production' ? null : 'warn',
  },
  defaultFieldNullability: false,
})

export { builder }
