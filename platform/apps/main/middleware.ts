import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { defaultNS as defaultLocale, Language, languages as locales } from './i18n/settings'
import { LANG_COOKIE_NAME } from './lib/constant'

export default async function middleware(request: NextRequest) {
  const cookieStore = await cookies()
  let lang: Language | undefined = cookieStore.get(LANG_COOKIE_NAME)?.value as Language | undefined
  if (lang && !locales.includes(lang)) {
    lang = undefined
  }
  const { pathname } = request.nextUrl
  const pathnameLocale: Language | undefined = pathname.split('/')[1] as Language | undefined
  const pathnameHasLocale = typeof pathnameLocale === 'string' && locales.includes(pathnameLocale)

  if (!lang && pathnameHasLocale) {
    cookieStore.set(LANG_COOKIE_NAME, pathnameLocale)
    return NextResponse.next()
  } else if (lang && !pathnameHasLocale) {
    request.nextUrl.pathname = `/${lang}${pathname}`
    return NextResponse.rewrite(request.nextUrl)
  } else if (!lang && !pathnameHasLocale) {
    cookieStore.set(LANG_COOKIE_NAME, defaultLocale)

    request.nextUrl.pathname = `/${defaultLocale}${pathname}`
    return NextResponse.rewrite(request.nextUrl)
  } else if (lang && pathnameHasLocale && pathnameLocale !== lang) {
    cookieStore.set(LANG_COOKIE_NAME, pathnameLocale)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],
}
