"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { IntegrationRequest } from "@/types/types"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const updateIntegrationRequest = async (
  id: number,
  inputs: Pick<IntegrationRequest, "status">,
) => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("integration_requests")
    .update(inputs)
    .eq("id", id)

  assertValidSupabaseResult(result)
}
