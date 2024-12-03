import { createApiEndpoint } from "@/utils/api"
import { updateFilterEntries } from "@/actions/filter-entries/update-filter-entries"
import { getFilterEntries } from "@/actions/filter-entries/get-filter-entries"

export const GET = createApiEndpoint("getFilterEntries", async (_req, ctx) => {
  const filterEntries = await getFilterEntries(Number(ctx.params.filter_id))

  return {
    items: filterEntries ?? [],
  }
})

export const PUT = createApiEndpoint(
  "updateFilterEntries",
  async (_req, ctx) => {
    const result = await updateFilterEntries({
      filter_id: Number(ctx.params.filter_id),
      items: ctx.body.items.map((item) => ({
        ...item,
        filter_id: Number(ctx.params.filter_id),
      })),
    })

    return {
      items: result,
    }
  },
)
