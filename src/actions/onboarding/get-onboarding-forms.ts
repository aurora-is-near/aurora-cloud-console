"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { OnboardingForm } from "@/types/types"

export const getOnboardingForms = async (): Promise<OnboardingForm[]> => {
  const supabase = createAdminSupabaseClient()
  const { data: teams } = await supabase
    .from("onboarding_form")
    .select("*")
    .order("id", { ascending: true })

  return teams ?? []
}
