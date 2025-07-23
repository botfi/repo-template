import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/client-integration-nextjs'
import { setContext } from '@apollo/client/link/context'
import { getApiUrl, X_BOTFI_GRAPHQL_CLIENT_NAME, X_BOTFI_GRAPHQL_CLIENT_VERSION } from '@botfi/api/utils'
import { env } from '@botfi/env/main'
import { cookies } from 'next/headers'

import { cacheConfig } from './cache'
import { typeDefs } from './typeDefs'

export const { getClient, query, PreloadQuery } = registerApolloClient(async () => {
  const contextLink = setContext((_, { headers }) => {
    return {
      headers: {
        cookie: cookies().toString(),
        [X_BOTFI_GRAPHQL_CLIENT_NAME]: 'main/rsc',
        [X_BOTFI_GRAPHQL_CLIENT_VERSION]: env.NEXT_PUBLIC_RELEASE_VERSION ?? '',
        ...headers,
      },
    }
  })

  const httpLink = new HttpLink({
    uri: getApiUrl('supergraph'),
    credentials: 'same-origin',
    fetchOptions: { cache: 'no-store' },
  })

  return new ApolloClient({
    cache: new InMemoryCache(cacheConfig),
    link: contextLink.concat(httpLink),
    typeDefs,
  })
})
