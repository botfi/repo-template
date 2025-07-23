'server only'

import { type i18n, type TFunction } from 'i18next'
import { cookies } from 'next/headers'

import i18next from './i18next'
import { cookieName, fallbackLng, Language, languages } from './settings'

export async function getTranslation(
  ns?: string | string[],
  options?: { keyPrefix?: string; lang?: string },
): Promise<{ t: TFunction; i18n: i18n }> {
  const cookieLang = (await cookies()).get(cookieName)?.value

  let i18nLang: Language = (options?.lang || cookieLang || fallbackLng) as Language

  if (!languages.includes(i18nLang as Language)) {
    console.warn(`Invalid language: ${i18nLang}, fallback to ${fallbackLng}`)
    i18nLang = fallbackLng
  }

  return {
    t: i18next.getFixedT(i18nLang, ns, options?.keyPrefix),
    i18n: i18next,
  }
}
