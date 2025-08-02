import { NextResponse } from 'next/server'

import { getClient, gql } from '@/lib/apollo/rsc'

const HEALTHCHECK_QUERY = gql`
  query Healthcheck {
    healthcheck
  }
`

export async function GET() {
  const client = await getClient()
  const { data } = await client.query({
    query: HEALTHCHECK_QUERY,
  })

  return NextResponse.json(data)
}
