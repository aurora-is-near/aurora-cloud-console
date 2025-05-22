"use client"

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"
import { Button } from "@/components/Button"
import { useDarkMode } from "@/hooks/useDarkMode"

export const DarkModeToggleButton = () => {
  const { isDarkModeEnabled, toggleDarkMode } = useDarkMode()

  const Icon = isDarkModeEnabled ? SunIcon : MoonIcon

  return (
    <Button variant="border" className="text-white" onClick={toggleDarkMode}>
      <Icon className="w-5 h-5" />
    </Button>
  )
}
