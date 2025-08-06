'use client'

import { env } from '@botfi/env/sys'
import { DevtoolsPanel, DevtoolsProvider as DevtoolsProviderBase } from '@refinedev/devtools'
import React from 'react'

export const DevtoolsProvider = (props: React.PropsWithChildren) => {
  if (env.NEXT_PUBLIC_ENV !== 'local') {
    return <>{props.children}</>
  }

  return (
    <DevtoolsProviderBase>
      {props.children}
      <DevtoolsPanel />
    </DevtoolsProviderBase>
  )
}
