import './global.css'

import { env } from '@botfi/env/sys'
import { Refine } from '@refinedev/core'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'
import routerProvider from '@refinedev/nextjs-router'
import dynamic from 'next/dynamic'
import { Geist, Geist_Mono } from 'next/font/google'
import React, { Suspense } from 'react'

import { authProviderClient } from '@/providers/AuthProvider/ssr'
import { dataProvider } from '@/providers/DataProvider'
import { DevtoolsProvider } from '@/providers/Devtools'
import { cookies } from 'next/headers'

const DefaultLayout = dynamic(() => import('@/components/layouts').then((mod) => mod.DefaultLayout), { ssr: !!!false })

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookie = await cookies()
  const collapsed = cookie.get('react-resizable-panels:collapsed')
  const layout = cookie.get('react-resizable-panels:layout')
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : false

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        <Suspense>
          <RefineKbarProvider>
            <DevtoolsProvider>
              <Refine
                routerProvider={routerProvider}
                authProvider={authProviderClient}
                dataProvider={dataProvider}
                resources={[
                  {
                    name: 'users',
                    list: '/users',
                    create: '/users/create',
                    meta: {
                      canDelete: false,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: env.NEXT_PUBLIC_REFINE_PROJECT_ID,
                }}
              >
                <DefaultLayout navCollapsedSize={5} defaultCollapsed={defaultCollapsed} defaultLayout={defaultLayout}>
                  {children}
                </DefaultLayout>
                <RefineKbar />
              </Refine>
            </DevtoolsProvider>
          </RefineKbarProvider>
        </Suspense>
      </body>
    </html>
  )
}
