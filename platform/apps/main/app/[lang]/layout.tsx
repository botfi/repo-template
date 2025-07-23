import '@botfi/ui/globals.css'

import { UIProvider } from '@botfi/ui/components/providers/UIProvider'
import { Geist, Geist_Mono } from 'next/font/google'

import type { Language } from '@/i18n/settings'

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
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: Language }>
}>) {
  const lang = (await params).lang

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  )
}
