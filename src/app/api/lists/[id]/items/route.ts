import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { ApiRequestBody, ApiRequestContext } from "@/types/api"
import { abort } from "../../../../../utils/abort"
import { getLimitAndCursor } from "@/utils/pagination"
import { createListItems } from "@/utils/proxy-api/create-list-items"
import { getListItems } from "@/utils/proxy-api/get-list-items"
import { getList } from "@/utils/proxy-api/get-list"

const DEFAULT_LIMIT = 20

export const GET = createApiEndpoint(
  "getListItems",
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const { limit = DEFAULT_LIMIT, cursor } = getLimitAndCursor(req)

    const [list, listItems] = await Promise.all([
      getList(ctx.team.id, Number(ctx.params.id)),
      getListItems(ctx.team.id, Number(ctx.params.id), {
        limit,
        beginKey: cursor,
      }),
    ])

    if (!list) {
      abort(404)
    }

    const items = listItems.responses?.[0].objects.map((item) => item.key) ?? []

    return {
      total: list.length,
      items,
    }
  },
)

export const POST = createApiEndpoint(
  "createListItems",
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const { items } = (await req.json()) as ApiRequestBody<"createListItems">

    await createListItems(ctx.team.id, Number(ctx.params.id), items)

    return {
      count: items.length,
    }
  },
)
