"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const deleteRuleUser = async (id: number) => {
  const supabase = createAdminSupabaseClient()

  await supabase
    .from("rule_users")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id)
}
