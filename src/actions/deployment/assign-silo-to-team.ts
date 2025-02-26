"use server"

import { getTeamOnboardingForm } from "@/actions/onboarding/get-onboarding-form"
import { getUnassignedSiloId } from "@/actions/silos/get-unassigned-silo-id"
import { BASE_TOKENS } from "@/constants/base-token"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Silo } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const assignSiloToTeam = async (
  teamId: number,
): Promise<Silo | null> => {
  const supabase = createAdminSupabaseClient()
  const onboardingForm = await getTeamOnboardingForm(teamId)

  if (!onboardingForm) {
    throw new Error(`Onboarding form not found for team ${teamId}`)
  }

  const { chainName, baseToken } = onboardingForm

  // 1. Get next available unassigned silo
  const unassignedSiloId = await getUnassignedSiloId()

  // Exit early if no unassigned silos, found
  if (!unassignedSiloId) {
    return null
  }

  // 2. Assign silo to a team
  await supabase
    .from("silos_teams")
    .insert([{ team_id: teamId, silo_id: unassignedSiloId }])

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
    .eq("id", unassignedSiloId)
    .select()
    .single()

  assertNonNullSupabaseResult(updateSiloResult)
  assertValidSupabaseResult(updateSiloResult)

  return updateSiloResult.data
}
