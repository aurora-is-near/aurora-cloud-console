"use client"

import { createContext, ReactNode, useCallback, useMemo, useState } from "react"

type MenuContextType = {
  isMenuOpen: boolean
  openMenu: () => void
  closeMenu: () => void
}

export const MenuContext = createContext<MenuContextType | null>(null)

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setMenuOpen] = useState(false)

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
    }),
    [isMenuOpen, closeMenu, openMenu],
  )

  return <MenuContext.Provider value={ctx}>{children}</MenuContext.Provider>
}
