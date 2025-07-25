'server only'

import { type i18n, type TFunction } from 'i18next'
import { headers } from 'next/headers'

import i18next from './i18next'
import { fallbackLng, headerName } from './settings'

export async function getTranslation(
  ns?: string | string[],
  options?: { keyPrefix?: string; lang?: string },
): Promise<{ t: TFunction; i18n: i18n }> {
  const headerList = await headers()
  const lang = headerList.get(headerName)

  if (lang && i18next.resolvedLanguage !== lang) {
    await i18next.changeLanguage(lang)
  }
  if (ns && !i18next.hasLoadedNamespace(ns)) {
    await i18next.loadNamespaces(ns)
  }
  return {
    t: i18next.getFixedT(
      lang ?? i18next.resolvedLanguage ?? fallbackLng,
      Array.isArray(ns) ? ns[0] : ns,
      options?.keyPrefix,
    ),
    i18n: i18next,
  }
}
