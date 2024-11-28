import { createApiEndpoint } from "@/utils/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const GET = createApiEndpoint("getFilter", async (_req, ctx) => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("filters")
    .select("*")
    .eq("id", ctx.params.id)
    .single()

  assertValidSupabaseResult(result)

  return result.data
})
