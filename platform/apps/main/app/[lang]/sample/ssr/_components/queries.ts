import { gql } from '@/lib/apollo/ssr'

export const userQuery = gql`
  query Me {
    me {
      id
      name
      createdAt
      updatedAt
    }
  }
`
