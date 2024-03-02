import { abort } from "@/utils/abort"
import { createApiEndpoint } from "@/utils/api"
import { deleteListItem } from "@/utils/proxy-api/delete-list-item"
import { getListItem } from "@/utils/proxy-api/get-list-item"

export const GET = createApiEndpoint("getListItem", async (_req, ctx) => {
  const result = await getListItem(
    ctx.team.id,
    Number(ctx.params.id),
    decodeURIComponent(ctx.params.item),
  )

  const { key } = result.responses?.[0]?.objects?.[0] ?? {}

  if (!key) {
    abort(404)
  }

  return key
})

export const DELETE = createApiEndpoint("deleteListItem", async (_req, ctx) => {
  await deleteListItem(
    ctx.team.id,
    Number(ctx.params.id),
    decodeURIComponent(ctx.params.item),
  )

  return null
})
