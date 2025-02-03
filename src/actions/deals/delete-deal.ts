"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

/**
 * @see https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#removing-deal
 */
export const deleteDeal = async (id: number) => {
  const supabase = createAdminSupabaseClient()

  await supabase.from("deals").delete().eq("id", id)
}
