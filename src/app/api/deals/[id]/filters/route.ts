import { createApiEndpoint } from "@/utils/api"
import { getFilters } from "@/actions/filters/get-filters"

export const GET = createApiEndpoint("getFilters", async (_req, ctx) => {
  const filters = await getFilters(Number(ctx.params.id))

  return {
    items: filters,
  }
})
