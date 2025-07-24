import { constructTestServer, gql } from 'config/graphql'

describe('query hello', () => {
  const QUERY_HELLO = gql`
    query Hello {
      hello
    }
  `

  it('should return hello', async () => {
    const { result } = await constructTestServer(undefined, { query: QUERY_HELLO })
    expect(result).toEqual({ data: { hello: 'Hello world!' } })
  })
})

describe('mutation hello', () => {
  const MUTATION_HELLO = gql`
    mutation Hello {
      hello
    }
  `

  it('should throw an error if user is not authenticated', async () => {
    const { result } = await constructTestServer(undefined, { query: MUTATION_HELLO })
    expect(result.errors).toBeDefined()
    expect(JSON.stringify(result.errors)).toMatch(/UNAUTHORIZED/)
  })

  it('should return hello', async () => {
    const { result } = await constructTestServer('some-user-id', { query: MUTATION_HELLO })
    expect(result.errors).toBeUndefined()
    expect(result.data?.hello).toBe('Hello world!')
  })
})
