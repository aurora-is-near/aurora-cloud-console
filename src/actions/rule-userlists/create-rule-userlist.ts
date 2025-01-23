"use server"

import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Userlist } from "@/types/types"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const createRuleUserlist = async (inputs: {
  team_id: number
  rule_id: number
}): Promise<PostgrestSingleResponse<Userlist>> => {
  const supabase = createAdminSupabaseClient()

  const userlistResult = await supabase
    .from("userlists")
    .insert({ team_id: inputs.team_id, ui_enabled: true })
    .select()
    .single()

  assertValidSupabaseResult(userlistResult)

  const result = await supabase
    .from("rules_userlists")
    .insert({ rule_id: inputs.rule_id, userlist_id: userlistResult.data.id })
    .select()
    .single()

  assertValidSupabaseResult(result)

  return userlistResult
}
