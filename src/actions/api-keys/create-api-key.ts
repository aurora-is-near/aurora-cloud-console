"use server"

import { PublicApiScope } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"

export const createApiKey = async (
  teamKey: string,
  data: {
    note: string
    scopes: PublicApiScope[]
  },
) => {
  const supabase = createAdminSupabaseClient()
  const team = await getTeamByKey(teamKey)
  const result = await supabase
    .from("api_keys")
    .insert({
      ...data,
      team_id: team.id,
    })
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
