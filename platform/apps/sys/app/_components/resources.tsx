import { ResourceProps } from '@refinedev/core'
import { UsersIcon } from 'lucide-react'

export const resources: ResourceProps[] = [
  {
    name: 'users',
    list: '/users',
    create: '/users/create',
    meta: {
      canDelete: false,
      label: 'Users',
      icon: <UsersIcon className="h-4 w-4" />,
    },
  },
]
