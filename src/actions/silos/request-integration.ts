"use server"

import { notReachable } from "@/utils/notReachable"
import { notifyIntegrationRequest } from "@/actions/contact/integration-request"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Silo, Team } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

type Integration = "intents" | "trisolaris"

export const requestIntegration = async (
  team: Team,
  silo: Silo,
  integration: Integration,
): Promise<Silo> => {
  const supabase = createAdminSupabaseClient()

  const values: Partial<
    Pick<Silo, "intents_integration_status" | "trisolaris_integration_status">
  > = {}

  switch (integration) {
    case "intents":
      values.intents_integration_status = "REQUESTED"
      break
    case "trisolaris":
      values.trisolaris_integration_status = "REQUESTED"
      break
    default:
      notReachable(integration)
  }

  const result = await supabase
    .from("silos")
    .update(values)
    .eq("id", silo.id)
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  await notifyIntegrationRequest(team, result.data, integration)

  return result.data
}
