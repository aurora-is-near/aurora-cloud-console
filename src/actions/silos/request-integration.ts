"use server"

import { notifyIntegrationRequest } from "@/actions/contact/integration-request"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Silo, Team } from "@/types/types"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const requestIntegration = async (
  team: Team,
  silo: Silo,
  integrationType: string,
) => {
  const supabase = createAdminSupabaseClient()

  const result = await supabase.from("integration_requests").insert({
    silo_id: silo.id,
    type: integrationType,
    status: "REQUESTED",
  })

  assertValidSupabaseResult(result)

  await notifyIntegrationRequest(team, silo, integrationType)
}
