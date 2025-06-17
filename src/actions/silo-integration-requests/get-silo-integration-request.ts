"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { IntegrationRequest } from "@/types/types"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const getSiloIntegrationRequest = async (
  siloId: number,
  integrationType: string,
): Promise<IntegrationRequest | null> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("integration_requests")
    .select("*")
    .eq("type", integrationType)
    .eq("silo_id", siloId)
    .maybeSingle()

  assertValidSupabaseResult(result)

  return result.data
}
