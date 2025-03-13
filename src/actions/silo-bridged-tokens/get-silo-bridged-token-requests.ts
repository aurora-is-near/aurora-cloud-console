"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { BridgedTokenRequest } from "@/types/types"

export const getSiloBridgedTokenRequests = async (
  siloId: number,
): Promise<BridgedTokenRequest[]> => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("bridged_token_requests")
    .select()
    .eq("silo_id", siloId)
    .is("resolved_at", null)
    .order("id", { ascending: true })

  return data ?? []
}
