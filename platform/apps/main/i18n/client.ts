'use client'

import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { initReactI18next, useTranslation as useTranslationReactI18next } from 'react-i18next'
import { showTranslations } from 'translation-check'
import { z } from 'zod'

import { BASE_PATH, LANG_COOKIE_NAME } from '@/lib/constant'
import { fallbackLng, getOptions, languages } from './settings'

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
        order: ['path', 'htmlTag', 'cookie', 'navigator'],
        lookupCookie: LANG_COOKIE_NAME,
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
  // The page /foo matches /<previous-lang>/foo since it was rewritten in middleware. We trust it.
  const lang = (useParams()?.lang as string) ?? fallbackLng
  if (typeof lang !== 'string') throw new Error('useTranslation is only available inside /app/[lang]')

  if (runsOnServerSide && i18next.resolvedLanguage !== lang) {
    i18next.changeLanguage(lang)
  } else {
    const [activeLng, setActiveLng] = useState(i18next.resolvedLanguage)
    useEffect(() => {
      if (activeLng === i18next.resolvedLanguage) return
      setActiveLng(i18next.resolvedLanguage)
    }, [activeLng, i18next.resolvedLanguage])
    useEffect(() => {
      if (!lang || i18next.resolvedLanguage === lang) return
      i18next.changeLanguage(lang)
    }, [lang, i18next])
  }

  return useTranslationReactI18next(ns, options)
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
