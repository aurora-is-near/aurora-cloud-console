import { deleteFilterEntry } from "@/actions/filter-entries/delete-filter-entry"
import { createApiEndpoint } from "@/utils/api"

export const DELETE = createApiEndpoint(
  "deleteFilterEntry",
  async (_req, ctx) => {
    await deleteFilterEntry(Number(ctx.params.filter_id), Number(ctx.params.id))

    return null
  },
)
