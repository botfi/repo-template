import { InMemoryCacheConfig } from '@apollo/client'

export const cacheConfig: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {},
    },
  },
}
