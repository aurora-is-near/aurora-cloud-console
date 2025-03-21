"use server"

import { Userlist } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const getUiUserlists = async ({
  rule_id,
}: {
  rule_id: number
}): Promise<Userlist[]> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("userlists")
    .select("*, rules_userlists!inner(*)")
    .eq("rules_userlists.rule_id", rule_id)
    .is("rules_userlists.deleted_at", null)
    .is("ui_enabled", true)

  assertValidSupabaseResult(result)

  return result.data
}
