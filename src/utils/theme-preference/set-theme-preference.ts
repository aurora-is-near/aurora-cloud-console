"use server"

import { User } from "@supabase/supabase-js"
import { THEME_PREFERENCE_KEY } from "@/constants/theme-preference"
import { ThemePreference } from "@/types/theme-preference"
import { createServerComponentClient } from "@/supabase/create-server-component-client"
import { isValidThemePreference } from "@/utils/theme-preference/is-valid-theme-preference"

export const setThemePreference = async (
  user: User,
  value: ThemePreference,
) => {
  const supabase = createServerComponentClient()

  if (!isValidThemePreference(value)) {
    throw new Error(`Invalid theme preference: ${value}`)
  }

  const { error } = await supabase.auth.updateUser({
    data: { [THEME_PREFERENCE_KEY]: value },
  })

  if (error) {
    throw new Error(`Error updating theme preference: ${error.message}`)
  }
}
