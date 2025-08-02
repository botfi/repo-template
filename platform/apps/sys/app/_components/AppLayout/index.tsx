'use client'

import type { PropsWithChildren } from 'react'
import { Breadcrumb } from '../Breadcrumb'
import { Menu } from '../Menu'

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="layout">
      <Menu />
      <div className="content">
        <Breadcrumb />
        <div>{children}</div>
      </div>
    </div>
  )
}
