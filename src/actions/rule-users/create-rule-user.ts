"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { RuleUser } from "@/types/types"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const createRuleUser = async (inputs: {
  team_id: number
  userlist_id: number
  eoas: string[]
}): Promise<RuleUser> => {
  const supabase = createAdminSupabaseClient()

  // Create user and add address from the UI in `eoas` field
  const result = await supabase
    .from("rule_users")
    .insert({
      eoas: inputs.eoas,
      team_id: inputs.team_id,
    })
    .select()
    .single()

  assertValidSupabaseResult(result)

  // Add user created to provided userlist
  const userlistInsertResult = await supabase
    .from("rule_users_userlists")
    .insert({
      rule_user_id: result.data.id,
      userlist_id: inputs.userlist_id,
    })
    .select()
    .single()

  assertValidSupabaseResult(userlistInsertResult)

  return result.data
}
