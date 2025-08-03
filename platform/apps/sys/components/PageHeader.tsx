import { cn } from '@botfi/ui/utils'
import { FC, ReactNode } from 'react'

export type PageHeaderProps = {
  title?: ReactNode
  subTitle?: ReactNode
  isBack?: boolean
  onBack?: (e?: React.MouseEvent<HTMLElement>) => void
  className?: string
  breadcrumb?: ReactNode
  extra?: ReactNode
}

export const PageHeader: FC<PageHeaderProps> = ({ extra, ...props }) => {
  return (
    <div className="w-full">
      <div className={cn('flex h-20 items-end lg:justify-between', props.className, !props.breadcrumb && 'h-auto')}>
        <div className="min-w-0 flex-1">
          {props.breadcrumb}
          <div className="mt-3 inline-flex flex-row items-center gap-x-4">
            <div className="inline-flex flex-col">
              <h2 className="text-2xl font-bold leading-7 text-black sm:truncate sm:text-3xl sm:tracking-tight dark:text-white">
                {props.title}
              </h2>
              {props.subTitle && <div className="mt-2 flex items-center text-sm text-gray-300">{props.subTitle}</div>}
            </div>
          </div>
        </div>
        <div className="flex lg:ml-4 lg:mt-0">{extra}</div>
      </div>
    </div>
  )
}
