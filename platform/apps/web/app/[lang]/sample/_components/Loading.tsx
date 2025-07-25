'use client'

import { useParams, usePathname } from 'next/navigation'

import { useTranslation } from '@/i18n/client'

export function Loading() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const lang = useParams()?.lang

  return (
    <em>
      {' '}
      {t('loading')}: {pathname} ({lang})
    </em>
  )
}
