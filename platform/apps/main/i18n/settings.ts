export const fallbackLng = 'en' as const
export const languages = [fallbackLng, 'ja'] as const
export type Language = (typeof languages)[number]

export const defaultNS = 'common'

export function getOptions(lang: Language = fallbackLng, ns: string | string[] = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng: lang,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}

export const headerName = 'x-i18next-current-lang'
export { LANG_COOKIE_NAME as cookieName } from '@/lib/constant'
