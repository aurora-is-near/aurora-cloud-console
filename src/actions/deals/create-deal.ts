"use server"

import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Deal } from "@/types/types"

export const createDeal = async (
  inputs: Pick<Deal, "name" | "team_id">,
): Promise<PostgrestSingleResponse<Deal>> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("deals")
    .insert({
      name: inputs.name,
      team_id: inputs.team_id,
    })
    .select("*, teams!inner(id)")
    .single()

  return result
}
