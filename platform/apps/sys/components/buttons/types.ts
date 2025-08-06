import type { Button } from '@botfi/ui/lib/button'

export type CustomButtonProps<T> = React.ComponentProps<typeof Button> & T
