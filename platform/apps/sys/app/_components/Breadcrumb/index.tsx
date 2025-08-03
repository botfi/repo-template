'use client'

import { useBreadcrumb, Link } from '@refinedev/core'

export const Breadcrumb = () => {
  const { breadcrumbs } = useBreadcrumb()

  return (
    <ul className="breadcrumb">
      {breadcrumbs.map((breadcrumb) => {
        return (
          <li key={`breadcrumb-${breadcrumb.label}`}>
            {breadcrumb.href ? <Link to={breadcrumb.href}>{breadcrumb.label}</Link> : <span>{breadcrumb.label}</span>}
          </li>
        )
      })}
    </ul>
  )
}
