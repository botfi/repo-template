'server only'

import { createInstance, type i18n, type TFunction } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { cookies } from 'next/headers'
import { initReactI18next } from 'react-i18next/initReactI18next'

import { LANG_COOKIE_NAME } from '@/lib/constant'
import { defaultNS, fallbackLng, getOptions, Language, languages } from './settings'

const initI18next = async (lang: string, ns: string | string[]) => {
  const i18nInstance = createInstance()
  let i18nLang: Language = lang as Language

  if (!languages.includes(i18nLang)) {
    console.warn(`Invalid language: ${lang}, fallback to ${fallbackLng}`)
    i18nLang = fallbackLng
  }

  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
    .init(getOptions(i18nLang, ns))
  return i18nInstance
}

export async function serverTranslation(
  ns?: string | string[],
  options?: { keyPrefix?: string; lang?: string },
): Promise<{ t: TFunction; i18n: i18n }> {
  const cookieLang = (await cookies()).get(LANG_COOKIE_NAME)?.value

  let i18nLang: Language = (options?.lang || cookieLang || fallbackLng) as Language

  if (!languages.includes(i18nLang as Language)) {
    console.warn(`Invalid language: ${i18nLang}, fallback to ${fallbackLng}`)
    i18nLang = fallbackLng
  }

  const i18nextInstance = await initI18next(i18nLang, ns ?? [defaultNS])
  return {
    t: i18nextInstance.getFixedT(i18nLang, ns, options?.keyPrefix),
    i18n: i18nextInstance,
  }
}
