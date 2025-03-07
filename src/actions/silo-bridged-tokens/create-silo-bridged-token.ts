"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const createSiloBridgedToken = async (
  siloId: number,
  bridgedTokenId: number,
  {
    isDeploymentPending,
    isActive,
  }: {
    isDeploymentPending: boolean
    isActive: boolean
  },
): Promise<void> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silo_bridged_tokens")
    .insert([
      {
        silo_id: siloId,
        bridged_token_id: bridgedTokenId,
        is_deployment_pending: isDeploymentPending,
        is_active: isActive,
      },
    ])
    .select()

  assertValidSupabaseResult(result)
}
