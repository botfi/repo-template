import '@botfi/ui/globals.css'

import { UIProvider } from '@botfi/ui/components/providers/UIProvider'
import { Geist, Geist_Mono } from 'next/font/google'

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
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  )
}
