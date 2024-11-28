import { createApiEndpoint } from "@/utils/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const GET = createApiEndpoint("getFilterEntries", async (_req, ctx) => {
  const supabase = createAdminSupabaseClient()
  const filterEntriesResult = await supabase
    .from("filter_entries")
    .select("*")
    .order("id", { ascending: true })
    .eq("filter_id", ctx.params.filter_id)

  assertValidSupabaseResult(filterEntriesResult)

  return {
    items: filterEntriesResult.data,
  }
})
