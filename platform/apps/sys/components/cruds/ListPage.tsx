'use client'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { PageHeader, PageHeaderProps } from '@/components/PageHeader'
import { CreateButton, CreateButtonProps } from '@/components/buttons'
import { cn } from '@botfi/ui/utils'
import { useRefineContext, useResource, useTranslate, useUserFriendlyName } from '@refinedev/core'
import { RefineCrudListProps } from '@refinedev/ui-types'
import { FC, isValidElement } from 'react'

export type ListPageProps = Omit<
  RefineCrudListProps<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    PageHeaderProps,
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  >,
  'createButtonProps'
> &
  Partial<{
    createButtonProps: CreateButtonProps
    extra: React.ReactNode
    className: string
  }>

export const ListPage: FC<ListPageProps> = ({
  title,
  resource: resourceFromProps,
  breadcrumb: breadcrumbFromProps,
  createButtonProps,
  className,
  canCreate = true,
  extra,
  children,
}) => {
  const translate = useTranslate()
  const { options: { breadcrumb: globalBreadcrumb } = {} } = useRefineContext()

  const getUserFriendlyName = useUserFriendlyName()

  const { resource, identifier } = useResource(resourceFromProps)

  const breadcrumb = typeof breadcrumbFromProps === 'undefined' ? globalBreadcrumb : breadcrumbFromProps

  return (
    <>
      <PageHeader
        title={
          title ??
          translate(
            `${identifier}.titles.List`,
            `List ${getUserFriendlyName(resource?.meta?.label ?? identifier, 'plural')}`,
          )
        }
        breadcrumb={isValidElement(breadcrumb) ? breadcrumb : <Breadcrumbs />}
        extra={
          extra ?? (
            <>
              <div className="inline-flex flex-row gap-4">
                {canCreate && (
                  <CreateButton {...createButtonProps} resource={createButtonProps?.resource ?? identifier} />
                )}
              </div>
            </>
          )
        }
      />
      <div className={cn('!mt-0 pt-2 sm:pt-4', className)}>{children}</div>
    </>
  )
}

ListPage.displayName = 'ListPage'
