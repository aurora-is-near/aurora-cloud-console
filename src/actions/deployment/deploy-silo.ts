"use server"

import { getTeamOnboardingForm } from "@/actions/onboarding/get-onboarding-form"
import { updateSilo } from "@/actions/silos/update-silo"
import { BASE_TOKENS } from "@/constants/base-token"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { OnboardingForm, Silo } from "@/types/types"
import { createSiloDeployerApiClient } from "@/utils/silo-deployer-api/silo-deployer-api-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

const assignSiloToTeam = async (
  teamId: number,
  { baseToken, chainName }: OnboardingForm,
): Promise<Silo | null> => {
  const supabase = createAdminSupabaseClient()

  // 1. Get next available unassigned silo
  const unassignedSiloResult = await supabase
    .from("silos")
    .select("id, teams(id)")
    .is("teams", null)
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle()

  assertValidSupabaseResult(unassignedSiloResult)

  // TODO: Handle the case where there are no unassigned silos
  if (!unassignedSiloResult.data) {
    return null
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

const updateSiloContract = async (
  silo: Silo,
  { baseToken }: OnboardingForm,
) => {
  const siloDeployerApiClient = createSiloDeployerApiClient()
  const baseTokenConfig = BASE_TOKENS[baseToken]

  // TODO: Place the transaction hash returned from this API call in a database,
  // so that we can track success or failure.
  if (baseTokenConfig) {
    await siloDeployerApiClient.setBaseToken({
      params: {
        contract_id: silo.engine_account,
      },
      data: {
        base_token_account_id: baseTokenConfig.nearAccountId,
      },
    })
  }
}

export const deploySilo = async (teamId: number): Promise<boolean> => {
  const onboardingForm = await getTeamOnboardingForm(teamId)

  if (!onboardingForm) {
    throw new Error(`Onboarding form not found for team ${teamId}`)
  }

  // Assign a silo to the team. At this point the silo contract will be
  // unconfigured (i.e. there is no base token). The row in the ACC database
  // should be seen as holding the desired, not necessarily the actual state.
  const silo = await assignSiloToTeam(teamId, onboardingForm)

  // If no silo was assigned it means we have run out and will need to feedback
  // to the user that they need to wait for more to be made available.
  if (!silo) {
    return false
  }

  // Trigger a process to update the silo on the contract level.
  await updateSiloContract(silo, onboardingForm)

  // If the above call succeeds we consider the deployment done and mark the
  // silo as activated.
  await updateSilo(silo.id, { is_active: true })

  return true
}
