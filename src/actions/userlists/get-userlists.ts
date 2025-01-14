"use server"

import { Userlist } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const getUserlists = async ({
  rule_id,
}: {
  rule_id: number
}): Promise<Userlist[]> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("userlists")
    .select("*, rules_userlists!inner(id)")
    .eq("rules_userlists.rule_id", rule_id)
    .is("rules_userlists.deleted_at", null)

  assertValidSupabaseResult(result)

  return result.data as Userlist[]
}
