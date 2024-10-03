"use client"

import { Bars3Icon } from "@heroicons/react/24/outline"
import { useCallback } from "react"
import { MainMenuButton } from "@/components/menu/MainMenuButton"
import { useMenu } from "@/hooks/useMenu"

export const MobileMenuToggleButton = () => {
  const { isMenuOpen, openMenu, closeMenu } = useMenu()

  const onClick = useCallback(() => {
    if (isMenuOpen) {
      closeMenu()

      return
    }

    openMenu()
  }, [closeMenu, isMenuOpen, openMenu])

  return (
    <MainMenuButton
      className="lg:hidden"
      name={isMenuOpen ? "Close menu" : "Open menu"}
      onClick={onClick}
      icon={<Bars3Icon />}
    />
  )
}
