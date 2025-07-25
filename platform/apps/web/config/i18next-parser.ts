import { UserConfig } from 'i18next-parser'
import { defaultNS, languages } from '../i18n'

const config: UserConfig = {
  locales: Array.from(languages),
  defaultNamespace: defaultNS,
  input: ['../app/**/*.{ts,tsx}', '../lib/**/*.{ts,tsx}'],
  lexers: {
    ts: [
      {
        lexer: 'JavascriptLexer',
        functions: ['t'],
        namespaceFunctions: ['useTranslation', 'serverTranslation'],
      },
    ],
    tsx: [
      {
        lexer: 'JsxLexer',
        functions: ['t'],
        namespaceFunctions: ['useTranslation', 'serverTranslation'],
      },
    ],
  },
  sort: true,
  verbose: true,
  createOldCatalogs: false,
  keepRemoved: true,
  output: 'i18n/locales/$LOCALE/$NAMESPACE.json',
}

export default config
