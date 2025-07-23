import { env } from '@botfi/env/main'

export const getApiUrl = (server: 'supergraph' | 'graph' | 'internal'): string => {
  return new URL(`/api/graphql/${server}`, env.NEXT_PUBLIC_URL).toString()
}

export const X_BOTFI_PREFIX = 'x-bf'
export const X_BOTFI_GRAPHQL_CLIENT_NAME = `${X_BOTFI_PREFIX}-graphql-client-name`
export const X_BOTFI_GRAPHQL_CLIENT_VERSION = `${X_BOTFI_PREFIX}-graphql-client-version`
export const X_BOTFI_INTERNAL_API_KEY = `${X_BOTFI_PREFIX}-api-key-main`
export const X_BOTFI_AUTHORIZATION = `${X_BOTFI_PREFIX}-authorization`
export const X_BOTFI_API_KEY = `${X_BOTFI_PREFIX}-api-key`
