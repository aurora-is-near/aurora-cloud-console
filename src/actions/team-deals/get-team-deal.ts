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
    .select("*, teams!inner(id)")
    .eq("id", dealId)
    .eq("teams.id", teamId)
    .is("deleted_at", null)
    .maybeSingle()

  return deal
}
