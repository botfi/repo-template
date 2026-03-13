import { env } from '@botfi/env/web'
import { Loader } from '@botfi/ui/components/Loader'
import { ModeToggle } from '@botfi/ui/components/ModeToggle'
import { Button } from '@botfi/ui/lib/button'

import { getTranslation } from '@/i18n/server'
import { languages } from '@/i18n/settings'

export const revalidate = 3600

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const { t } = await getTranslation(undefined, { lang })
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">{t('hello')}</h1>
        <Button size="sm">
          <Loader className="mr-2 h-4 w-4" />
          Button
        </Button>
        <em>{env.NEXT_PUBLIC_URL}</em>
        <ModeToggle />
      </div>
    </div>
  )
}
