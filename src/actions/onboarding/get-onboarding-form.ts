"use server"

import { OnboardingForm } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeamOnboardingForm = async (
  team_id: number,
): Promise<OnboardingForm | null> => {
  const supabase = createAdminSupabaseClient()

  const { data: team_onboarding_form } = await supabase
    .from("onboarding_form")
    .select("*")
    .eq("team_id", team_id)
    .maybeSingle()

  return team_onboarding_form
}
