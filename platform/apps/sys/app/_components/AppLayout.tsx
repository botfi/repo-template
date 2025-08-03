import { env } from '@botfi/env/sys'
import { Refine } from '@refinedev/core'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'
import routerProvider from '@refinedev/nextjs-router'
import { HomeIcon } from 'lucide-react'

import { DefaultLayout, DefaultLayoutProps } from '@/components/layouts'
import { authProviderClient } from '@/providers/AuthProvider/ssr'
import { dataProvider } from '@/providers/DataProvider'
import { DevtoolsProvider } from '@/providers/Devtools'
import { resources } from './resources'

interface AppLayoutProps extends Pick<DefaultLayoutProps, 'children' | 'defaultCollapsed' | 'defaultLayout'> {}

export const AppLayout = ({ children, defaultCollapsed, defaultLayout }: AppLayoutProps) => {
  return (
    <RefineKbarProvider>
      <DevtoolsProvider>
        <Refine
          routerProvider={routerProvider}
          authProvider={authProviderClient}
          dataProvider={dataProvider}
          resources={resources}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            useNewQueryKeys: true,
            projectId: env.NEXT_PUBLIC_REFINE_PROJECT_ID,
          }}
        >
          <DefaultLayout
            navCollapsedSize={5}
            defaultCollapsed={defaultCollapsed}
            defaultLayout={defaultLayout}
            logo={{
              collapsed: <HomeIcon className="h-4 w-4" />,
              default: (
                <div className="inline-flex items-center gap-x-4">
                  <HomeIcon className="h-4 w-4" />
                  <h3 className="text-xl font-bold">Sys Admin</h3>
                </div>
              ),
            }}
          >
            {children}
          </DefaultLayout>
          <RefineKbar />
        </Refine>
      </DevtoolsProvider>
    </RefineKbarProvider>
  )
}
