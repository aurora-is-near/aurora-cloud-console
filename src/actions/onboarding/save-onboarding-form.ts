"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Tables } from "@/types/supabase"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const saveOnboardingForm = async (
  inputs: Omit<Tables<"onboarding_form">, "id" | "created_at">,
) => {
  const supabase = createAdminSupabaseClient()

  // Check if an existing onboarding form exists for this team
  const { data: existingForm } = await supabase
    .from("onboarding_form")
    .select()
    .eq("team_id", inputs.team_id!)
    .single()

  if (existingForm) {
    // Update existing form
    const result = await supabase
      .from("onboarding_form")
      .update(inputs)
      .eq("id", existingForm.id)
      .select()
      .single()

    assertValidSupabaseResult(result)

    return result.data
  }

  // If no existing form, proceed with insertion

  const result = await supabase
    .from("onboarding_form")
    .insert(inputs)
    .select()
    .single()

  assertValidSupabaseResult(result)

  return result.data
}
