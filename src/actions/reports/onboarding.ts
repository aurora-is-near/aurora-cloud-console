"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const getOnboardingReport = async () => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase.from("onboarding_form").select("*").csv()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result
}
