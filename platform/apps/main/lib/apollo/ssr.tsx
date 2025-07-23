'use client'

import { ApolloLink, HttpLink } from '@apollo/client'
import { ApolloClient, ApolloNextAppProvider, InMemoryCache, SSRMultipartLink } from '@apollo/client-integration-nextjs'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'
import { getApiUrl } from '@botfi/api/utils'
import * as React from 'react'

import { cacheConfig } from './cache'
import { typeDefs } from './typeDefs'

if (process.env.NODE_ENV === 'development') {
  loadDevMessages()
  loadErrorMessages()
}

const makeClientFactory = () => () => {
  const httpLink = new HttpLink({
    uri: getApiUrl('supergraph'),
    credentials: 'same-origin',
    fetchOptions: { cache: 'no-store' },
  })

  return new ApolloClient({
    cache: new InMemoryCache(cacheConfig),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), httpLink])
        : ApolloLink.from([httpLink]),
    credentials: 'same-origin',
    typeDefs,
  })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const makeClient = makeClientFactory()
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}

export { useBackgroundQuery, useFragment, useMutation, useQuery, useReadQuery, useSuspenseQuery } from '@apollo/client'
