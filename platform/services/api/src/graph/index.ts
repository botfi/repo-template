export type { Context } from './definition'
export { createHandler } from './handler'
export {
  /**
   * STEP 7: Export the dummy schema to ensure all the types are built
   *
   * Since this file is one of the entry points, it will be included in the
   * tree-shaking system.
   *
   * @deprecated DO NOT USE THIS DIRECTLY
   */
  _SCHEMA,
  schema,
} from './types'
