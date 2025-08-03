'use client'

import { buttonVariants } from '@botfi/ui/lib/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@botfi/ui/lib/tooltip'
import { cn } from '@botfi/ui/utils'
import { useMenu, useResourceParams } from '@refinedev/core'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type NavProps = {
  isCollapsed: boolean
}

export const Sidebar = ({ isCollapsed }: NavProps) => {
  const { menuItems } = useMenu()
  const resourceParams = useResourceParams()
  const pathname = usePathname()

  const currentPathname = String(pathname)

  const GetIcon = (item: (typeof menuItems)[0]) => {
    const icon = item.meta?.icon
    if (React.isValidElement(icon)) {
      return React.cloneElement<any>(icon, {
        className: 'mr-2 w-4 h-4',
      })
    }
    return null
  }

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex h-[94dvh] flex-col justify-between gap-4 py-2 data-[collapsed=true]:py-2 xl:h-[84dvh]"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {menuItems
          .filter((i) => !i.meta?.hide)
          .map((item, key) => {
            const paths = [
              item.list?.toString(),
              item.create?.toString(),
              item.edit?.toString()?.replace(':id', resourceParams.id as string),
              item.show?.toString()?.replace(':id', resourceParams.id as string),
            ].filter(Boolean) as string[]
            const isActive =
              paths.includes(currentPathname) ||
              paths.some((path) => {
                return path?.startsWith(currentPathname) || currentPathname.startsWith(path)
              })
            return isCollapsed ? (
              <Tooltip key={key} delayDuration={0}>
                <TooltipTrigger asChild>
                  <NextLink
                    key={key}
                    href={item.list?.toString() ?? '/#'}
                    title={item.meta?.title ?? item.name}
                    className={cn(
                      buttonVariants({
                        variant: 'ghost',
                      }),
                      'justify-start',
                      isActive
                        ? 'bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground'
                        : '',
                    )}
                  >
                    {item.meta?.icon}
                    <span className="sr-only">
                      {item.meta?.title ?? item.label} {item.list ? 'List' : 'Create'}
                    </span>
                  </NextLink>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                  {item.label}
                  {item.meta?.label && <span className="text-muted-foreground ml-auto">{item.meta?.label}</span>}
                </TooltipContent>
              </Tooltip>
            ) : (
              <NextLink
                key={key}
                href={item.list?.toString() ?? '/#'}
                title={item.meta?.title ?? item.name}
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  {
                    'justify-start': true,
                    'bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground': isActive,
                  },
                )}
              >
                {GetIcon(item)}
                {item.meta?.title ?? item.name}
              </NextLink>
            )
          })}
      </nav>
    </div>
  )
}

Sidebar.displayName = 'Sidebar'
