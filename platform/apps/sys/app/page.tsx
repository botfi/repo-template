import { env } from '@botfi/env'
import { Button } from '@botfi/ui/lib/button'

export default async function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello</h1>
        <Button size="sm">Button</Button>
        <em>{env.NEXT_PUBLIC_ENV}</em>
      </div>
    </div>
  )
}
