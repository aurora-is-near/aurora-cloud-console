"use server"

import { BridgedTokenRequest } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getBridgedTokenRequests = async (): Promise<
  BridgedTokenRequest[]
> => {
  const supabase = createAdminSupabaseClient()

  const { data } = await supabase
    .from("bridged_token_requests")
    .select("*")
    .is("resolved_at", null)
    .order("id", { ascending: true })

  return data ?? []
}
