'use client'

import React from 'react'

import { useQuery } from '@/lib/apollo/ssr'
import { Result } from './Result'
import { userQuery } from './queries'

export function UserQuery({ children }: React.PropsWithChildren) {
  const result = useQuery(userQuery, { fetchPolicy: 'cache-first' })
  return (
    <>
      <Result source="useQuery(userQuery)" data={result.data} />
      <React.Fragment key="children">{children}</React.Fragment>
    </>
  )
}
