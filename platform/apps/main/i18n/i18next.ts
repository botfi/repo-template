import { BASE_PATH } from '@/lib/constant'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { showTranslations } from 'translation-check'
import { cookieName, defaultNS, fallbackLng, getOptions, languages } from './settings'

export const runsOnServerSide = typeof window === 'undefined'
const pathname = runsOnServerSide ? '' : window.location.pathname

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
  .init(
    {
      ...getOptions(),
      supportedLngs: languages,
      fallbackLng,
      lng: undefined, // let detect the language on client side
      fallbackNS: defaultNS,
      defaultNS,
      detection: {
        order: ['path', 'htmlTag', 'cookie', 'navigator'],
        lookupCookie: cookieName,
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
      if (!runsOnServerSide && new URLSearchParams(window.location.search).has('showTranslations')) {
        showTranslations(i18next, {
          sourceLng: 'en',
          targetLngs: ['ja'],
          preserveEmptyStrings: false,
        })
      }
    },
  )

export default i18next
