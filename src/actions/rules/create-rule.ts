"use server"

import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Rule } from "@/types/types"

export const createRule = async (inputs: {
  rule: Pick<Rule, "deal_id" | "resource_definition">
  team_id: number
}): Promise<PostgrestSingleResponse<Rule>> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("rules")
    .insert({ ...inputs.rule, ui_enabled: true })
    .select()
    .single()

  return result
}
