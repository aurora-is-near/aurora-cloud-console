"use server"

import { createRuleUserlist } from "@/actions/rule-userlists/create-rule-userlist"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Rule } from "@/types/types"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const createRule = async (inputs: {
  rule: Pick<Rule, "deal_id" | "resource_definition">
  team_id: number
}): Promise<Rule> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("rules")
    .insert({ ...inputs.rule, ui_enabled: true })
    .select()
    .single()

  assertValidSupabaseResult(result)

  // Every Rule needs a Userlist in ACC's UI
  await createRuleUserlist({
    team_id: inputs.team_id,
    rule_id: result.data.id,
  })

  return result.data
}
