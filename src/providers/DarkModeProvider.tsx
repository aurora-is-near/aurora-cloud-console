"use client"

import { createContext, ReactNode, useCallback, useMemo, useState } from "react"
import clsx from "clsx"
import { ThemePreference } from "@/types/theme-preference"
import { setThemePreference } from "@/utils/set-theme-preference"

export type DarkModeContextType = {
  isDarkModeEnabled: boolean
}

type DarkModeProviderProps = {
  children: ReactNode
  initialThemePreference: ThemePreference
}

export const DarkModeContext = createContext<DarkModeContextType | null>(null)

export const DarkModeProvider = ({
  children,
  initialThemePreference,
}: DarkModeProviderProps) => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(
    initialThemePreference === "dark",
  )

  const toggleDarkMode = useCallback(() => {
    setIsDarkModeEnabled((prev) => !prev)
    setThemePreference(isDarkModeEnabled ? "light" : "dark")
  }, [isDarkModeEnabled])

  const ctx = useMemo(
    () => ({ isDarkModeEnabled, toggleDarkMode }),
    [isDarkModeEnabled, toggleDarkMode],
  )

  return (
    <DarkModeContext.Provider value={ctx}>
      <div className={clsx(isDarkModeEnabled && "dark")}>{children}</div>
    </DarkModeContext.Provider>
  )
}
