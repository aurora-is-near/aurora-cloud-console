"use server"

import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const getApiKeys = async (teamKey: string) => {
  const supabase = createAdminSupabaseClient()
  const team = await getTeamByKey(teamKey)
  const result = await supabase
    .from("api_keys")
    .select("*, teams(team_key)")
    .order("id", { ascending: true })
    .eq("team_id", team.id)

  assertValidSupabaseResult(result)

  return result.data
}
