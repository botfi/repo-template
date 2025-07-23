import { prisma } from '@botfi/db'
import type PrismaTypes from '@botfi/db/graphql'
import { env } from '@botfi/env/main'
import SchemaBuilder from '@pothos/core'
import DirectivePlugin from '@pothos/plugin-directives'
import FederationPlugin from '@pothos/plugin-federation'
import PrismaPlugin from '@pothos/plugin-prisma'
import ScopeAuthPlugin from '@pothos/plugin-scope-auth'
import ZodPlugin from '@pothos/plugin-zod'

import type { Context } from './definition'

/**
 * STEP 1: Define the builder
 */
const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
  Context: Context
  AuthScopes: {
    authenticated: boolean
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
  plugins: [DirectivePlugin, PrismaPlugin, ZodPlugin, ScopeAuthPlugin, FederationPlugin],
  scopeAuth: {
    authScopes: async (context) => ({
      authenticated: !!context.sub,
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
