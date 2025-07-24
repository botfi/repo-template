import { prisma, User } from '@botfi/db'
import * as UserFactory from '@botfi/db/factories/User'
import { constructTestServer, gql } from 'config/graphql'

describe('query me GraphQL integration', () => {
  let user: User

  beforeEach(async () => {
    user = await UserFactory.create()
  })

  afterEach(async () => {
    await prisma.user.deleteMany()
    user = null as unknown as User
  })

  const ME_QUERY = gql`
    query Me {
      me {
        id
        name
      }
    }
  `

  it('should throw an error if user is not authenticated', async () => {
    const { result } = await constructTestServer(undefined, { query: ME_QUERY })
    expect(result.errors).toBeDefined()
    expect(JSON.stringify(result.errors)).toMatch(/UNAUTHORIZED/)
  })

  it('should throw an error if user is not found', async () => {
    const { result } = await constructTestServer('non-existent-user', { query: ME_QUERY })
    expect(result.errors).toBeDefined()
    expect(JSON.stringify(result.errors)).toMatch(/NOT_FOUND/)
  })

  it('should return the user', async () => {
    const { result } = await constructTestServer(user.id, { query: ME_QUERY })
    expect(result.errors).toBeUndefined()
    expect(result.data?.me.id).toBe(user.id)
    expect(result.data?.me.name).toBe(user.name)
  })
})
