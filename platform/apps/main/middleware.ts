import acceptLanguage from 'accept-language'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { cookieName, fallbackLng, headerName, languages as locales } from './i18n/settings'

acceptLanguage.languages(locales as unknown as string[])

export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.indexOf('icon') > -1 || req.nextUrl.pathname.indexOf('chrome') > -1) {
    return NextResponse.next()
  }

  const cookieStore = await cookies()
  let lang

  if (req.cookies.has(cookieName)) lang = acceptLanguage.get(cookieStore.get(cookieName)?.value)
  if (!lang) lang = acceptLanguage.get(req.headers.get('Accept-Language'))
  if (!lang) lang = fallbackLng

  const langInPath = locales.find((l) => req.nextUrl.pathname.startsWith(`/${l}`))
  const headers = new Headers(req.headers)
  headers.set(headerName, langInPath || lang)

  // Rewrite if lang is not in path to maintain the behavior /foo matches /<previous-lang>/foo
  if (!langInPath && !req.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.rewrite(new URL(`/${lang}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url))
  }

  if (headers.has('referer')) {
    const refererUrl = new URL(headers.get('referer')!)
    const langInReferer = locales.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next({ headers })
    if (langInReferer) response.cookies.set(cookieName, langInReferer)
    return response
  }

  return NextResponse.next({ headers })
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)'],
}
