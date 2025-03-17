"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const updateSiloBridgedToken = async (
  siloId: number,
  bridgedTokenId: number,
  data: {
    isDeploymentPending: boolean
  },
): Promise<void> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silo_bridged_tokens")
    .update({
      is_deployment_pending: data.isDeploymentPending,
    })
    .eq("silo_id", siloId)
    .eq("bridged_token_id", bridgedTokenId)

  assertValidSupabaseResult(result)
}
