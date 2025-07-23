import { Button } from '@botfi/ui/lib/button'

import { serverTranslation } from '@/i18n/server'

export default async function Page() {
  const { t } = await serverTranslation()
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">{t('hello')}</h1>
        <Button size="sm">Button</Button>
      </div>
    </div>
  )
}
