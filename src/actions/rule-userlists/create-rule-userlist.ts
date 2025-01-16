"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Userlist } from "@/types/types"
import {
  abortIfNoSupabaseResult,
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const createRuleUserlist = async (inputs: {
  team_id: number
  rule_id: number
}): Promise<Userlist> => {
  const supabase = createAdminSupabaseClient()

  const userlistResult = await supabase
    .from("userlists")
    .insert({ team_id: inputs.team_id })
    .select()
    .single()

  assertValidSupabaseResult(userlistResult)

  const result = await supabase
    .from("rules_userlists")
    .insert({ rule_id: inputs.rule_id, userlist_id: userlistResult.data.id })
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)
  abortIfNoSupabaseResult(404, result)

  return userlistResult.data
}
