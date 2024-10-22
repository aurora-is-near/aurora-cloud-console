"use server"

import { Deal } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeamDealByKey = async (
  teamKey: string,
  dealId: number,
): Promise<Deal | null> => {
  const supabase = createAdminSupabaseClient()
  const { data: deal } = await supabase
    .from("deals")
    .select("*, teams!inner(team_key)")
    .eq("id", dealId)
    .eq("teams.team_key", teamKey)
    .maybeSingle()

  return deal
}
