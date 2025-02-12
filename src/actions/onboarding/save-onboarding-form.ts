"use server"

import { notifySlackOnboarding } from "@/actions/onboarding/notify-slack-onboarding"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { OnboardingForm, Team } from "@/types/types"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const saveOnboardingForm = async (
  team: Team,
  inputs: Omit<OnboardingForm, "id" | "chainId" | "created_at">,
) => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("onboarding_form")
    .upsert(inputs, { onConflict: "team_id, networkType" })
    .select()
    .single()

  assertValidSupabaseResult(result)

  if (inputs.telegramHandle) {
    await notifySlackOnboarding(team, inputs)
  }

  return result.data
}
