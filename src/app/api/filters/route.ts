import { createApiEndpoint } from "@/utils/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const GET = createApiEndpoint("getFilters", async (_req, ctx) => {
  const supabase = createAdminSupabaseClient()
  const filtersResult = await supabase
    .from("filters")
    .select("*")
    .order("id", { ascending: true })
    .eq("deal_id", ctx.params.deal_id)

  assertValidSupabaseResult(filtersResult)

  return {
    items: filtersResult.data,
  }
})
