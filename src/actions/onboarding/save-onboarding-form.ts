"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Tables } from "@/types/supabase"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const saveOnboardingForm = async (
  inputs: Omit<Tables<"onboarding_form">, "id" | "chainId" | "created_at">,
) => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("onboarding_form")
    .upsert(inputs, { onConflict: "team_id, networkType" })
    .select()
    .single()

  assertValidSupabaseResult(result)

  return result.data
}
