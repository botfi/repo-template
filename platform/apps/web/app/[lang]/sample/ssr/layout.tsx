import { ApolloWrapper } from '@/lib/apollo/ssr'

export default function Layout({ children }: React.PropsWithChildren) {
  return <ApolloWrapper>{children}</ApolloWrapper>
}
