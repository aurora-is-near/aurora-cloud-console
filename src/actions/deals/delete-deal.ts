"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

/**
 * @see https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#removing-deal
 */
export const deleteDeal = async (id: number) => {
  const supabase = createAdminSupabaseClient()

  // TODO: Also delete from the Proxy API
  await supabase.from("deals").delete().eq("id", id)
}
