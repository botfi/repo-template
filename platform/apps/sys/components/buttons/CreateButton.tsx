import { Button } from '@botfi/ui/lib/button'
import { useCreateButton } from '@refinedev/core'
import { RefineCreateButtonProps } from '@refinedev/ui-types'
import { SquarePlusIcon } from 'lucide-react'
import type { FC } from 'react'
import type { CustomButtonProps } from './types'

export type CreateButtonProps = CustomButtonProps<
  Pick<RefineCreateButtonProps, 'resource' | 'hideText' | 'accessControl' | 'meta' | 'onClick'>
>

export const CreateButton: FC<CreateButtonProps> = ({
  resource,
  hideText = false,
  accessControl,
  meta,
  onClick,
  children,
  ...props
}) => {
  const { hidden, disabled, label, title, LinkComponent, to } = useCreateButton({
    resource,
    accessControl,
    meta,
  })

  if (hidden) return null

  return (
    <LinkComponent
      to={to}
      replace={false}
      onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
        if (disabled) {
          e.preventDefault()
          return
        }
        if (onClick) {
          e.preventDefault()
          onClick(e)
        }
      }}
    >
      <Button disabled={disabled} title={title} {...props}>
        <SquarePlusIcon className="mr-2 h-4 w-4" />
        {!hideText && (children ?? label)}
      </Button>
    </LinkComponent>
  )
}

CreateButton.displayName = 'CreateButton'
