'use client'

import { Button } from '@botfi/ui/lib/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@botfi/ui/lib/dropdown-menu'
import { LaptopIcon, LoaderCircleIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

export const ModeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { setTheme, theme } = useTheme()
  const createHandleSetTheme =
    (theme: string): React.MouseEventHandler<HTMLDivElement> =>
    () =>
      setTheme(theme)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <LoaderCircleIcon className="h-[1.2rem] w-[1.2rem] animate-spin" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {theme === 'light' && (
            <SunIcon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          )}
          {theme === 'dark' && (
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
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
