import { builder } from '../builder'

/**
 * STEP 2: Define a default query. This is required to bypass the error when
 * building the schema in tree-shaking system
 * ```
 *  Error: Type Query must define one or more fields.
 * ```
 */
builder.queryType({
  fields: (t) => ({
    hello: t.string({
      resolve: () => 'Hello world!',
    }),
  }),
})
builder.mutationType({
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

/**
 * STEP 4: Export a dummy schema to ensure all the types are built
 * @private This is only used to bypass the error when building the schema in tree-shaking system
 */
export const _SCHEMA = { Scalars }

/**
 * STEP 5: Build and export the actual schema
 */
export const schema = builder.toSchema()
