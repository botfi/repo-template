import NextLink from 'next/link'

import { gql, query } from '@/lib/apollo/rsc'
import { Loading } from './_components/Loading'

export default async function Page() {
  const { data } = await query({
    query: gql`
      query {
        hello
      }
    `,
  })
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Sample</h1>
        <Loading />
        <p>data received during RSC render:</p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <p>
          <NextLink href="/sample/ssr">SSR examples are here</NextLink>
        </p>
      </div>
    </div>
  )
}
