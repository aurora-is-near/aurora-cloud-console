import { createApiEndpoint } from "@/utils/api"
import { deleteListItem } from "@/utils/proxy-api/delete-list-item"

export const DELETE = createApiEndpoint("deleteListItem", async (_req, ctx) => {
  await deleteListItem(
    ctx.team.id,
    Number(ctx.params.id),
    decodeURIComponent(ctx.params.item),
  )

  return null
})
