"use client"

import { createContext, ReactNode, useCallback, useMemo, useState } from "react"

type MenuContextType = {
  isMenuOpen: boolean
  openMenu: () => void
  closeMenu: () => void
  setHasMenu: (hasMenu: boolean) => void
  hasMenu: boolean
}

export const MenuContext = createContext<MenuContextType | null>(null)

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [hasMenu, setHasMenu] = useState(false)

  const openMenu = useCallback(() => {
    setMenuOpen(true)
  }, [setMenuOpen])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
  }, [setMenuOpen])

  const ctx = useMemo(
    () => ({
      isMenuOpen,
      openMenu,
      closeMenu,
      setHasMenu,
      hasMenu,
    }),
    [isMenuOpen, closeMenu, openMenu, setHasMenu, hasMenu],
  )

  return <MenuContext.Provider value={ctx}>{children}</MenuContext.Provider>
}
