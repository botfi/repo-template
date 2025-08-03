import { UIProvider } from '@botfi/ui/components/providers/UIProvider'
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{}>

export const BaseLayout: React.FC<Props> = ({ children }) => {
  return <UIProvider>{children}</UIProvider>
}
