import { AppLayout } from '@/app/_components/AppLayout'
import { authProviderServer } from '@/providers/AuthProvider/rsc'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Layout({ children }: React.PropsWithChildren) {
  const data = await getData()

  if (!data.authenticated) {
    return redirect(data?.redirectTo || '/login')
  }

  return <AppLayout>{children}</AppLayout>
}

async function getData() {
  const { authenticated, redirectTo } = await authProviderServer.check()

  return {
    authenticated,
    redirectTo,
  }
}
