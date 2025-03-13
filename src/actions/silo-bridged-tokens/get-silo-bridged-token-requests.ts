"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { SiloBridgedTokenRequest } from "@/types/types"

export const getSiloBridgedTokenRequests = async (
  siloId: number,
): Promise<SiloBridgedTokenRequest[]> => {
  const supabase = createAdminSupabaseClient()
  const { data } = await supabase
    .from("bridged_token_requests")
    .select()
    .eq("silo_id", siloId)
    .order("id", { ascending: true })

  return data ?? []
}
