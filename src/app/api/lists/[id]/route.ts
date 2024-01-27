import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { abort } from "../../../../utils/abort"
import { getTeamList } from "@/actions/admin/team-lists/get-team-list"
import { updateList } from "@/actions/admin/lists/update-list"

export const GET = createApiEndpoint(
  "getList",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const list = await getTeamList(ctx.team.id, Number(ctx.params.id))

    if (!list) {
      abort(404)
    }

    return list
  },
)

export const PUT = createApiEndpoint(
  "updateList",
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const { name } = await req.json()

    if (!name) {
      abort(400, "Name is required")
    }

    const list = await updateList(Number(ctx.params.id), {
      name,
    })

    if (!list) {
      abort(404)
    }

    return list
  },
)
