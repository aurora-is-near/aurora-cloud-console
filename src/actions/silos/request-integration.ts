"use server"

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

  if (integration === "intents") {
    values.intents_integration_status = "REQUESTED"
  } else if (integration === "trisolaris") {
    values.trisolaris_integration_status = "REQUESTED"
  } else {
    throw new Error(`Invalid integration request: ${integration}`)
  }

  const result = await supabase
    .from("silos")
    .update(values)
    .eq("id", silo.id)
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  if (integration === "intents") {
    await notifyIntegrationRequest(team, result.data, "Intents")
  } else if (integration === "trisolaris") {
    await notifyIntegrationRequest(team, result.data, "Trisolaris")
  }

  return result.data
}
