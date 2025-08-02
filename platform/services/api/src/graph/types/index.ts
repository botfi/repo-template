import { healthCheck } from '@botfi/db/utils'
import { builder } from '../builder'

/**
 * STEP 2: Define a default query. This is required to bypass the error when
 * building the schema in tree-shaking system
 * ```
 *  Error: Type Query must define one or more fields.
 * ```
 */
builder.queryType({
  authScopes: {
    // Default required scope for all queries
    auth: true,
  },
  fields: (t) => ({
    hello: t.string({
      // Skip the default scope for this field
      skipTypeScopes: true,
      resolve: () => 'Hello world!',
    }),
    healthcheck: t.boolean({
      skipTypeScopes: true,
      resolve: async () => {
        const result = await healthCheck()
        return result.status === 'healthy'
      },
    }),
  }),
})
builder.mutationType({
  authScopes: {
    // Default required scope for all mutations
    auth: true,
  },
  fields: (t) => ({
    hello: t.string({
      resolve: () => 'Hello world!',
    }),
  }),
})

/**
 * STEP 3: Define types
 */
import * as Scalars from './Scalars'
import * as User from './User'

/**
 * STEP 4: Export a dummy schema to ensure all the types are built
 * @private This is only used to bypass the error when building the schema in tree-shaking system
 */
export const _SCHEMA = { Scalars, User }

/**
 * STEP 5: Build and export the actual schema
 */
export const schema = builder.toSchema()
