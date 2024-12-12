"use server"

import { Deal } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const getDeals = async ({
  teamId,
}: {
  teamId: number
}): Promise<Deal[]> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("deals")
    .select("*")
    .order("id", { ascending: true })
    .eq("team_id", teamId)

  assertValidSupabaseResult(result)

  return result.data
}
