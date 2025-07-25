import { Suspense } from 'react'

import { HTMLChangesObserver } from './_components/HTMLChangesObserver'
import { SuspenseUserQuery } from './_components/SuspenseUserQuery'
import { UserQuery } from './_components/UserQuery'

export default function Page() {
  return (
    <HTMLChangesObserver>
      <Suspense>
        <SuspenseUserQuery>
          <UserQuery />
        </SuspenseUserQuery>
        <UserQuery />
      </Suspense>
    </HTMLChangesObserver>
  )
}
