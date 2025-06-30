"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { IntegrationRequest } from "@/types/types"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const getIntegrationRequest = async (
  id: number,
): Promise<IntegrationRequest | null> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("integration_requests")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  assertValidSupabaseResult(result)

  return result.data
}
