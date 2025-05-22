import { THEME_PREFERENCES } from "@/constants/theme-preference"
import { ThemePreference } from "@/types/theme-preference"

export const isValidThemePreference = (
  theme?: string,
): theme is ThemePreference =>
  !!theme && THEME_PREFERENCES.includes(theme as ThemePreference)
