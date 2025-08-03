'use client'

import { Link, useLogout, useMenu } from '@refinedev/core'

export const Menu = () => {
  const { mutate: logout } = useLogout()
  const { menuItems, selectedKey } = useMenu()

  return (
    <nav className="menu">
      <ul>
        {menuItems.map((item) => (
          <li key={item.key}>
            <Link to={item.route ?? '/'} className={selectedKey === item.key ? 'active' : ''}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={() => logout()}>Logout</button>
    </nav>
  )
}
