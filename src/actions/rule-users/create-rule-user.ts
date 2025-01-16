"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { RuleUser } from "@/types/types"
import {
  abortIfNoSupabaseResult,
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const createRuleUser = async (inputs: {
  userlist_id: number
  eoas: string[]
}): Promise<RuleUser> => {
  const supabase = createAdminSupabaseClient()

  // Create user and add address from the UI in `eoas` field
  const result = await supabase
    .from("rule_users")
    .insert({
      eoas: inputs.eoas,
    })
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  // Add user created to provided userlist
  const userlistInsertResult = await supabase
    .from("rule_users_userlists")
    .insert({
      rule_user_id: result.data.id,
      userlist_id: inputs.userlist_id,
    })
    .select()
    .single()

  abortIfNoSupabaseResult(404, userlistInsertResult)

  return result.data
}
