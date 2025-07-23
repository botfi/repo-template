import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  getApiUrl,
  X_BOTFI_API_KEY,
  X_BOTFI_AUTHORIZATION,
  X_BOTFI_GRAPHQL_CLIENT_NAME,
  X_BOTFI_GRAPHQL_CLIENT_VERSION,
  X_BOTFI_INTERNAL_API_KEY,
  X_BOTFI_PREFIX,
} from './utils'

// Mock the env module
vi.mock('@botfi/env/main', () => ({
  env: {
    NEXT_PUBLIC_URL: 'https://botfi.io',
  },
}))

describe('utils', () => {
  describe('getApiUrl', () => {
    beforeEach(() => {
      vi.clearAllMocks()
    })

    it('should return correct URL for supergraph server', () => {
      const result = getApiUrl('supergraph')
      expect(result).toBe('https://botfi.io/api/graphql/supergraph')
    })

    it('should return correct URL for graph server', () => {
      const result = getApiUrl('graph')
      expect(result).toBe('https://botfi.io/api/graphql/graph')
    })

    it('should return correct URL for internal server', () => {
      const result = getApiUrl('internal')
      expect(result).toBe('https://botfi.io/api/graphql/internal')
    })

    it('should return valid URL objects', () => {
      const supergraphResult = getApiUrl('supergraph')
      const internalResult = getApiUrl('internal')

      // Test that results are valid URLs
      expect(() => new URL(supergraphResult)).not.toThrow()
      expect(() => new URL(internalResult)).not.toThrow()
    })

    it('should include the server type in the path', () => {
      const supergraphResult = getApiUrl('supergraph')
      const internalResult = getApiUrl('internal')

      expect(supergraphResult).toContain('supergraph')
      expect(internalResult).toContain('internal')
    })
  })

  describe('constants', () => {
    it('should have correct X_ZAPASS_PREFIX value', () => {
      expect(X_BOTFI_PREFIX).toBe('x-bf')
    })

    it('should have correct X_ZAPASS_GRAPHQL_CLIENT_NAME value', () => {
      expect(X_BOTFI_GRAPHQL_CLIENT_NAME).toBe('x-bf-graphql-client-name')
    })

    it('should have correct X_ZAPASS_GRAPHQL_CLIENT_VERSION value', () => {
      expect(X_BOTFI_GRAPHQL_CLIENT_VERSION).toBe('x-bf-graphql-client-version')
    })

    it('should have correct X_ZAPASS_INTERNAL_API_KEY value', () => {
      expect(X_BOTFI_INTERNAL_API_KEY).toBe('x-bf-api-key-main')
    })

    it('should have correct X_ZAPASS_AUTHORIZATION value', () => {
      expect(X_BOTFI_AUTHORIZATION).toBe('x-bf-authorization')
    })

    it('should have correct X_ZAPASS_API_KEY value', () => {
      expect(X_BOTFI_API_KEY).toBe('x-bf-api-key')
    })

    it('should ensure all header constants start with the prefix', () => {
      const headerConstants = [
        X_BOTFI_GRAPHQL_CLIENT_NAME,
        X_BOTFI_GRAPHQL_CLIENT_VERSION,
        X_BOTFI_INTERNAL_API_KEY,
        X_BOTFI_AUTHORIZATION,
        X_BOTFI_API_KEY,
      ]

      headerConstants.forEach((constant) => {
        expect(constant).toMatch(new RegExp(`^${X_BOTFI_PREFIX}-`))
      })
    })
  })
})
