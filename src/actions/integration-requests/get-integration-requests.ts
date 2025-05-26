"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { IntegrationRequest } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const getIntegrationRequests = async (): Promise<
  (IntegrationRequest & { silo: { id: number; name: string } })[]
> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("integration_requests")
    .select("*, silos!inner(id, name)")
    .order("silo_id", { ascending: true })

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data.map((integrationRequest) => ({
    ...integrationRequest,
    silo: integrationRequest.silos,
  }))
}
