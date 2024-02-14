import { ApiRequestContext } from "@/types/api"
import { createApiEndpoint } from "@/utils/api"
import { deleteListItem } from "@/utils/proxy-api/delete-list-item"
import { NextRequest } from "next/server"

export const DELETE = createApiEndpoint(
  "deleteListItem",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    await deleteListItem(
      ctx.team.id,
      Number(ctx.params.id),
      decodeURIComponent(ctx.params.item),
    )

    return null
  },
)
