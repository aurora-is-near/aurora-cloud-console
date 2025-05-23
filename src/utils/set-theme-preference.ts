"use server"

import { cookies } from "next/headers"
import { ThemePreference } from "@/types/theme-preference"
import { THEME_PREFERENCE_KEY } from "@/constants/theme-preference"

export const setThemePreference = (value: ThemePreference) => {
  const cookieStore = cookies()

  cookieStore.set(THEME_PREFERENCE_KEY, value)
}
