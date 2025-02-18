"use server"

import { OnboardingForm } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeamOnboardingFormByKey = async (
  teamKey: string,
): Promise<OnboardingForm | null> => {
  const supabase = createAdminSupabaseClient()

  const { data } = await supabase
    .from("onboarding_form")
    .select("*, teams!inner(team_key)")
    .eq("teams.team_key", teamKey)
    .maybeSingle()

  return data
}
