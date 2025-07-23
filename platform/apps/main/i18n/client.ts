'use client'

import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { initReactI18next, useTranslation as reactUseTranslation } from 'react-i18next'
import { showTranslations } from 'translation-check'
import { z } from 'zod'

import { BASE_PATH, LANG_COOKIE_NAME } from '@/lib/constant'
import { getOptions, languages } from './settings'

const runsOnServerSide = typeof window === 'undefined'
const pathname = runsOnServerSide ? '' : window.location.pathname

const languageDetector = new LanguageDetector()

i18next
  .use(initReactI18next)
  .use(languageDetector)
  .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
  .init(
    {
      ...getOptions(),
      lng: undefined, // detect the language on client side
      detection: {
        order: ['path', 'cookie', 'localStorage'],
        lookupCookie: LANG_COOKIE_NAME,
        lookupLocalStorage: 'i18nextLng',
        caches: ['localStorage', 'cookie'],
      },
      // Important on server-side to assert translations are loaded before rendering views.
      // Important to ensure that both languages are available for the / path simultaneously
      preload: runsOnServerSide || pathname === BASE_PATH ? languages : [],
      debug: process.env.NODE_ENV === 'development' && !runsOnServerSide,
    },
    (err, _t) => {
      if (err) {
        console.error(err)
      }
      if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('showTranslations')) {
        showTranslations(i18next, {
          sourceLng: 'en',
          targetLngs: ['ja'],
          preserveEmptyStrings: false,
        })
      }
    },
  )

export function useTranslation(ns?: string | string[], options?: Record<string, unknown>) {
  const clientHook = reactUseTranslation(ns, options)
  const {
    i18n: { language },
  } = clientHook
  const locale = (useParams()?.locale as string) ?? null

  // If we're rendering on the client and the language is different from the resolved language,
  // change the language to match the locale in url
  useEffect(() => {
    if (language !== locale && locale !== null) {
      clientHook.i18n.changeLanguage(locale)
    }
  })

  // If we're rendering on the server and the language is different from the resolved language,
  // This prevents hydration mismatches
  if (runsOnServerSide && language !== locale && locale !== null) {
    clientHook.i18n.changeLanguage(locale)
  }

  return clientHook
}

type UseZodResolverErrorMapFn = (issue: z.ZodIssue, ctx: { defaultError: string }) => { message: string }

type UseTranslationFn = ReturnType<typeof useTranslation>
type UseZodResolverErrorMapHOCArgs = {
  t: UseTranslationFn['t']
  i18n: UseTranslationFn['i18n']
}
type UseZodResolverErrorMapHOCFn = (args: UseZodResolverErrorMapHOCArgs) => UseZodResolverErrorMapFn

/**
 * Custom error map for zod resolver
 */
export const useZodResolverErrorMap: UseZodResolverErrorMapHOCFn =
  ({ t, i18n }) =>
  (error, ctx) => {
    let translationKey = `errors:${String(error.path[0])}`
    translationKey += error.code === z.ZodIssueCode.custom ? `.${error.message}` : `.${error.code}`

    const isErrorDefined = i18n.exists(translationKey)
    if (!isErrorDefined) console.log(`${translationKey} is not defined`, { error })

    // TODO: improve with other zod issue types
    let minimum: number | undefined
    if ('minimum' in error) minimum = Number(error.minimum)
    let maximum: number | undefined
    if ('maximum' in error) maximum = Number(error.maximum)

    const message = isErrorDefined ? t(translationKey, { minimum, maximum }) : ctx.defaultError

    return { message }
  }
