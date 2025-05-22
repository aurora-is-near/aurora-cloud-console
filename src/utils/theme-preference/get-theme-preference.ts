import { User } from "@supabase/supabase-js"
import { ThemePreference } from "@/types/theme-preference"
import { THEME_PREFERENCE_KEY } from "@/constants/theme-preference"
import { isValidThemePreference } from "./is-valid-theme-preference"

export const getThemePreference = (user: User): ThemePreference => {
  const storedPreference = user.user_metadata?.[THEME_PREFERENCE_KEY]

  if (isValidThemePreference(storedPreference)) {
    return storedPreference
  }

  return "light"
}
