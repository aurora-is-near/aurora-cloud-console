import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const countDeals = async (): Promise<number> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("deals")
    .select("*", { count: "exact", head: true })

  assertValidSupabaseResult(result)

  return result.count ?? 0
}
