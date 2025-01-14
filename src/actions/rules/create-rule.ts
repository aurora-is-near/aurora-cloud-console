"use server"

import { createRuleUserlist } from "@/actions/rule-userlists/create-rule-userlist"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Json } from "@/types/supabase"
import { Rule } from "@/types/types"
import {
  abortIfNoSupabaseResult,
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const createRule = async (inputs: {
  deal_id: number
  team_id: number
  resource_definition: Json
}): Promise<Rule> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("rules")
    .insert({
      deal_id: inputs.deal_id,
      resource_definition: inputs.resource_definition,
    })
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  // Every Rule needs a Userlist in ACC's UI
  await createRuleUserlist({
    team_id: inputs.team_id,
    rule_id: result.data.id,
  })

  abortIfNoSupabaseResult(404, result)

  return result.data as Rule
}
