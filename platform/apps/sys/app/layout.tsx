import '@botfi/ui/globals.css'

import { env } from '@botfi/env/sys'
import { UIProvider } from '@botfi/ui/components/providers/UIProvider'
import { Refine } from '@refinedev/core'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'
import routerProvider from '@refinedev/nextjs-router'
import { Geist, Geist_Mono } from 'next/font/google'
import React, { Suspense } from 'react'

import { authProviderClient } from '@/providers/AuthProvider/ssr'
import { dataProvider } from '@/providers/DataProvider'
import { DevtoolsProvider } from '@/providers/Devtools'

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        <UIProvider>
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
                  {children}
                  <RefineKbar />
                </Refine>
              </DevtoolsProvider>
            </RefineKbarProvider>
          </Suspense>
        </UIProvider>
      </body>
    </html>
  )
}
