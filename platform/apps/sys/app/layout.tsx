import './global.css'

import { Geist, Geist_Mono } from 'next/font/google'
import { cookies } from 'next/headers'
import React, { Suspense } from 'react'

import { AppLayout } from './_components/AppLayout'

// import dynamic from 'next/dynamic'
// const AppLayout = dynamic(() => import('./_components/AppLayout').then((mod) => mod.AppLayout), { ssr: !!!false })

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
        <Suspense fallback={<div>Loading...</div>}>
          <AppLayout defaultCollapsed={defaultCollapsed} defaultLayout={defaultLayout}>
            {children}
          </AppLayout>
        </Suspense>
      </body>
    </html>
  )
}
