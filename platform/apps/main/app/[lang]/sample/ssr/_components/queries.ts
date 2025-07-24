import { gql } from '@/lib/apollo/ssr'

export const userQuery = gql`
  query {
    hello
  }
`