'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation as useTranslationReactI18next } from 'react-i18next'
import { z } from 'zod'

import i18next, { runsOnServerSide } from './i18next'
import { fallbackLng } from './settings'

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
