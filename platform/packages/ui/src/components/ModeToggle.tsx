'use client'

import { Button } from '@botfi/ui/lib/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@botfi/ui/lib/dropdown-menu'
import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import React from 'react'

export const ModeToggle = () => {
  const { setTheme, theme } = useTheme()
  const createHandleSetTheme =
    (theme: string): React.MouseEventHandler<HTMLDivElement> =>
    () =>
      setTheme(theme)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {theme === 'light' && (
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          )}
          {theme === 'dark' && (
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          )}
          {theme === 'system' && <LaptopIcon className="h-[1.2rem] w-[1.2rem]" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={'end'}>
        <DropdownMenuItem onClick={createHandleSetTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={createHandleSetTheme('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={createHandleSetTheme('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
