"use client"

import { createContext, ReactNode, useCallback, useMemo, useState } from "react"
import { User } from "@supabase/supabase-js"
import clsx from "clsx"
import { getThemePreference } from "@/utils/theme-preference/get-theme-preference"
import { setThemePreference } from "@/utils/theme-preference/set-theme-preference"

export type DarkModeContextType = {
  isDarkModeEnabled: boolean
  toggleDarkMode: () => void
}

type DarkModeProviderProps = {
  children: ReactNode
  authUser: User | null
}

export const DarkModeContext = createContext<DarkModeContextType | null>(null)

export const DarkModeProvider = ({
  children,
  authUser,
}: DarkModeProviderProps) => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(
    !!authUser && getThemePreference(authUser) === "dark",
  )

  const toggleDarkMode = useCallback(() => {
    setIsDarkModeEnabled((prev) => !prev)

    if (authUser) {
      void setThemePreference(authUser, isDarkModeEnabled ? "light" : "dark")
    }
  }, [authUser, isDarkModeEnabled])

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
