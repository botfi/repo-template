'use client'

import { useIsMobile } from '@botfi/ui/hooks/use-mobile'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@botfi/ui/lib/resizable'
import { cn } from '@botfi/ui/utils'
import { Link, useResource } from '@refinedev/core'
import dynamic from 'next/dynamic'
import { ComponentProps, isValidElement, ReactElement, ReactNode, useMemo, useState } from 'react'

import { BaseLayout } from './BaseLayout'
import { Sidebar } from './Sidebar'

const ModeToggle = dynamic(() => import('@botfi/ui/components/ModeToggle').then((mod) => mod.ModeToggle), {
  ssr: false,
})

export type LogoType = ReactElement<ComponentProps<'img'>> | ReactNode

export interface DefaultLayoutProps extends React.PropsWithChildren<{}> {
  navCollapsedSize: number
  navbar?: {
    leftSide: React.ReactNode
    rightSide: React.ReactNode
  }
  footer?: ReactElement | ReactNode
  defaultCollapsed?: boolean
  defaultLayout?: number[]
  logo?: {
    collapsed: LogoType
    default: LogoType
  }
}

export const DefaultLayout = ({
  children,
  navCollapsedSize,
  navbar,
  footer,
  defaultCollapsed,
  defaultLayout,
  logo,
}: DefaultLayoutProps) => {
  const { resources } = useResource()
  const firstDashboard = resources?.[0]

  const isMobile = useIsMobile()

  const [isCollapsed, setIsCollapsed] = useState<boolean>(isMobile ?? defaultCollapsed ?? false)

  const layout = useMemo(() => {
    if (defaultLayout) return defaultLayout
    return isMobile ? [15, 85] : [5, 95]
  }, [isMobile, defaultLayout])

  const SidebarSizes = useMemo(
    () => (isMobile ? { minSize: 15, maxSize: 65 } : { minSize: 5, maxSize: 25 }),
    [isMobile],
  )

  const hasCollapsed = useMemo(() => isCollapsed || isMobile, [isCollapsed, isMobile])

  const Logo: LogoType | undefined = useMemo<LogoType | undefined>((): LogoType | undefined => {
    if (!logo) return null

    if (!hasCollapsed && isValidElement(logo.default)) return logo.default

    const component = hasCollapsed ? logo.collapsed : logo.default
    if (isValidElement(component)) return component

    return null
  }, [logo, defaultLayout, hasCollapsed])

  return (
    <BaseLayout>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
        }}
        className="h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={layout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={SidebarSizes.minSize}
          maxSize={SidebarSizes.maxSize}
          onExpand={() => {
            const collapsed = isMobile ?? defaultCollapsed ?? false
            setIsCollapsed(collapsed)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(collapsed)}`
          }}
          onCollapse={() => {
            const collapsed = true
            setIsCollapsed(collapsed)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(collapsed)}`
          }}
          className={cn(hasCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')}
        >
          <div
            className={cn(
              'border-border/40 flex max-h-14 items-center justify-center border-b py-1.5',
              hasCollapsed && 'px-2',
            )}
          >
            <Link
              to={firstDashboard?.list?.toString() ?? '/'}
              className="inline-flex items-center justify-center"
              title={firstDashboard?.meta?.label ?? firstDashboard?.name}
            >
              {Logo}
            </Link>
          </div>
          <Sidebar isCollapsed={hasCollapsed} />
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-border/40" />
        <ResizablePanel
          defaultSize={layout[1]}
          minSize={25}
          className="flex h-full flex-col !overflow-y-auto overflow-x-hidden xl:max-h-dvh"
        >
          <header
            className={cn(
              'border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex h-14 items-center justify-end border-b px-4 py-2 backdrop-blur',
              navbar?.rightSide && 'justify-between',
            )}
          >
            {navbar?.leftSide && <div className="flex flex-1 items-center justify-start">{navbar?.leftSide}</div>}
            {navbar?.rightSide ? (
              <div className="flex flex-1 items-center justify-end">
                {<ModeToggle />}
                {navbar?.rightSide}
              </div>
            ) : (
              <ModeToggle />
            )}
          </header>
          <main className="grow px-6 py-4">{children}</main>
          {footer && (
            <footer className="border-border/40 bg-background text-primary sticky bottom-0 flex flex-row items-center border-t px-6 py-4">
              <div className="w-full">{footer}</div>
            </footer>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </BaseLayout>
  )
}

DefaultLayout.displayName = 'DefaultLayout'
