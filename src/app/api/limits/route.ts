import { createApiEndpoint } from "@/utils/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import { adaptLimit } from "@/utils/adapters"

export const GET = createApiEndpoint("getLimits", async (_req, ctx) => {
  const supabase = createAdminSupabaseClient()
  const limitsResult = await supabase
    .from("limits")
    .select("*")
    .order("id", { ascending: true })
    .eq("deal_id", ctx.params.deal_id)

  assertValidSupabaseResult(limitsResult)

  return {
    items: limitsResult.data.map(adaptLimit),
  }
})
