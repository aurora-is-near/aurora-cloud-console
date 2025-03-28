"use server"

import { notifyIntegrationRequest } from "@/actions/contact/integration-request"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Silo, Team } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const requestIntentsIntegration = async (
  team: Team,
  silo: Silo,
): Promise<Silo> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silos")
    .update({ intents_integration_status: "REQUESTED" })
    .eq("id", silo.id)
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  await notifyIntegrationRequest(team, result.data, "Intents")

  return result.data
}
