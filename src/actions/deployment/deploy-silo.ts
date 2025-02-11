"use server"

import { getTeamOnboardingForm } from "@/actions/onboarding/get-onboarding-form"
import { updateTeam } from "@/actions/teams/update-team"
import { BASE_TOKENS } from "@/constants/base-tokens"
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

const updateSiloContract = async (silo: Silo) => {
  const siloDeployerApiClient = createSiloDeployerApiClient()

  // TODO: Place the transaction hash returned from this API call in a database,
  // so that we can track success or failure.
  if (silo.base_token_symbol) {
    await siloDeployerApiClient.setBaseToken({
      params: {
        contract_id: silo.engine_account,
      },
      data: {
        base_token_addr: silo.base_token_symbol,
      },
    })
  }
}

export const deploySilo = async (teamId: number) => {
  const onboardingForm = await getTeamOnboardingForm(teamId)

  if (!onboardingForm) {
    throw new Error(`Onboarding form not found for team ${teamId}`)
  }

  // Assign a silo to the team. At this point the silo contract will be
  // unconfigured (i.e. there is no base token). The row in the ACC database
  // should be seen as holding the desired, not necessarily the actual state.
  const silo = await assignSiloToTeam(teamId, onboardingForm)

  // TODO: Handle the case where no silo could not be assigned
  // (i.e. they have run out).
  if (!silo) {
    return
  }

  // Update the team to indicate that the deployment is in progress.
  await updateTeam(teamId, { onboarding_status: "DEPLOYMENT_IN_PROGRESS" })

  // Trigger a process to update the silo on the contract level.
  await updateSiloContract(silo)

  // For now, if the above call succeeds we will consider the deployment done.
  await updateTeam(teamId, { onboarding_status: "DEPLOYMENT_DONE" })
}
