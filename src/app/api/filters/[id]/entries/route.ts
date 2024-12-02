import { createApiEndpoint } from "@/utils/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import { updateFilterEntries } from "@/actions/filter-entries/update-filter-entries"

export const GET = createApiEndpoint("getFilterEntries", async (_req, ctx) => {
  const supabase = createAdminSupabaseClient()
  const filterEntriesResult = await supabase
    .from("filter_entries")
    .select("*")
    .order("id", { ascending: true })
    .eq("filter_id", Number(ctx.params.id))

  assertValidSupabaseResult(filterEntriesResult)

  return {
    items: filterEntriesResult.data,
  }
})

export const PUT = createApiEndpoint(
  "updateFilterEntries",
  async (_req, ctx) => {
    const result = await updateFilterEntries({
      filter_id: Number(ctx.params.id),
      items: ctx.body.items.map((item) => ({
        ...item,
        filter_id: Number(ctx.params.id),
      })),
    })

    return {
      items: result,
    }
  },
)
