"use server"

import { getTeamOnboardingForm } from "@/actions/onboarding/get-onboarding-form"
import { BASE_TOKENS } from "@/constants/base-token"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Silo } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const assignSiloToTeam = async (teamId: number): Promise<Silo> => {
  const supabase = createAdminSupabaseClient()
  const onboardingForm = await getTeamOnboardingForm(teamId)

  if (!onboardingForm) {
    throw new Error(`Onboarding form not found for team ${teamId}`)
  }

  const { chainName, baseToken } = onboardingForm

  // 1. Get next available unassigned silo
  const unassignedSiloResult = await supabase
    .from("silos")
    .select("id, teams(id)")
    .is("teams", null)
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle()

  assertValidSupabaseResult(unassignedSiloResult)

  if (!unassignedSiloResult.data) {
    throw new Error("No unassigned silos found")
  }

  // 2. Assign silo to a team
  const siloId = unassignedSiloResult.data.id

  await supabase
    .from("silos_teams")
    .insert([{ team_id: teamId, silo_id: siloId }])

  // 3. Update the silo based on the onboarding form details
  const siloUpdateData: Partial<Silo> = {}

  if (chainName) {
    siloUpdateData.name = chainName
  }

  const baseTokenConfig = BASE_TOKENS[baseToken]

  if (baseTokenConfig) {
    siloUpdateData.base_token_name = baseTokenConfig.name
    siloUpdateData.base_token_symbol = baseToken
  }

  const updateSiloResult = await supabase
    .from("silos")
    .update(siloUpdateData)
    .eq("id", siloId)
    .select()
    .single()

  assertNonNullSupabaseResult(updateSiloResult)
  assertValidSupabaseResult(updateSiloResult)

  return updateSiloResult.data
}
