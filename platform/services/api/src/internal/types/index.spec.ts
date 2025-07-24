import { constructTestInternalServer } from 'config/graphql'
import { gql } from 'graphql-tag'

describe('query hello', () => {
  const HELLO_QUERY = gql`
    query Hello {
      hello
    }
  `

  it('should return hello', async () => {
    const { result } = await constructTestInternalServer({ query: HELLO_QUERY })
    expect(result).toEqual({ data: { hello: 'Hello world!' } })
  })

  it('should return hello regardless of api key', async () => {
    const { result } = await constructTestInternalServer({ apiKey: 'invalid', query: HELLO_QUERY })
    expect(result).toEqual({ data: { hello: 'Hello world!' } })
  })
})

describe('mutate hello', () => {
  const HELLO_MUTATION = gql`
    mutation Hello {
      hello
    }
  `
  it('should return hello', async () => {
    const { result } = await constructTestInternalServer({ query: HELLO_MUTATION })
    expect(result).toEqual({ data: { hello: 'Hello world!' } })
  })

  it('should return error if invalid api key is provided', async () => {
    const { result } = await constructTestInternalServer({ apiKey: 'invalid', query: HELLO_MUTATION })
    expect(result?.errors).toBeDefined()
    expect(result?.errors?.[0].extensions?.code).toMatch(/UNAUTHORIZED/)
  })
})
