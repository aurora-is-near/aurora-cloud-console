import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"

import { getTeamLists } from "@/actions/admin/team-lists/get-team-lists"
import { abort } from "@/utils/abort"
import { createList } from "@/actions/admin/lists/create-list"

export const GET = createApiEndpoint(
  "getLists",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const lists = await getTeamLists(ctx.team.id)

    return {
      items: lists ?? [],
    }
  },
)

export const POST = createApiEndpoint(
  "createList",
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const { name } = await req.json()

    if (!name) {
      abort(400, "Name is required")
    }

    return createList({ name, team_id: ctx.team.id })
  },
)
