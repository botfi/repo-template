import { prisma } from '@botfi/db'
import type PrismaTypes from '@botfi/db/graphql'
import { env } from '@botfi/env/web'
import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import ScopeAuthPlugin from '@pothos/plugin-scope-auth'
import ZodPlugin from '@pothos/plugin-zod'
import { GraphQLError } from 'graphql'

import { X_BOTFI_INTERNAL_API_KEY } from '../utils'
import type { Context } from './definition'

/**
 * STEP 1: Define the builder
 */
const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
  Context: Context
  AuthScopes: {
    api: boolean
  }
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
  plugins: [PrismaPlugin, ZodPlugin, ScopeAuthPlugin],
  scopeAuth: {
    unauthorizedError: (_parent, _context, { path, fieldNodes }, result) => {
      return new GraphQLError(result.message ?? 'Unauthorized', {
        path: [path.typename, path.key].filter(Boolean) as (string | number)[],
        nodes: fieldNodes,
        extensions: {
          code: 'UNAUTHORIZED',
        },
      })
    },
    authScopes: async (context) => ({
      api: context.headers[X_BOTFI_INTERNAL_API_KEY] === env.INTERNAL_API_KEY,
    }),
  },
  prisma: {
    client: prisma,
    // defaults to false, uses /// comments from prisma schema as descriptions
    // for object types, relations and exposed fields.
    // descriptions can be omitted by setting description to false
    // exposeDescriptions: boolean | { models: boolean, fields: boolean },
    // use where clause from prismaRelatedConnection for totalCount (will true by default in next major version)
    filterConnectionTotalCount: true,
    // warn when not using a query parameter correctly
    onUnusedQuery: env.NODE_ENV === 'production' ? null : 'warn',
  },
  defaultFieldNullability: false,
})

export { builder }
