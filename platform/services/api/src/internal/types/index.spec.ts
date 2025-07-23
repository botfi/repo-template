import { constructTestServer, extractSingleResult } from 'config/it.utils'
import { gql } from 'graphql-tag'

const HELLO = gql`
  query Hello {
    hello
  }
`

describe('hello', () => {
  it('should return hello', async () => {
    const { server, context } = await constructTestServer('user-sub-123')
    const res = await server.executeOperation(
      {
        query: HELLO,
      },
      {
        contextValue: context,
      },
    )
    expect(extractSingleResult(res)).toEqual({ data: { hello: 'Hello world!' } })
  })
})
