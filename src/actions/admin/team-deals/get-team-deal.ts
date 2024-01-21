"use server"

import { Deal } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeamDeal = async (
  teamId: number,
  dealId: number,
): Promise<Deal | null> => {
  const supabase = createAdminSupabaseClient()
  const { data: deal } = await supabase
    .from("deals")
    .select("*, teams(id)")
    .eq("id", dealId)
    .eq("teams.id", teamId)
    .maybeSingle()

  return deal
}
