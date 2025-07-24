'use client'

import React from 'react'

import { useSuspenseQuery } from '@/lib/apollo/ssr'
import { userQuery } from './queries'
import { Result } from './Result'

export function SuspenseUserQuery({ children }: React.PropsWithChildren) {
  const result = useSuspenseQuery(userQuery, { fetchPolicy: 'cache-first' })
  return (
    <>
      <Result source="useSuspenseQuery(userQuery)" data={result.data} />
      <React.Fragment key="children">{children}</React.Fragment>
    </>
  )
}
