import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"

import { getTeamLists } from "@/actions/admin/team-lists/get-team-lists"
import { abort } from "@/utils/abort"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

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

    const supabase = createAdminSupabaseClient()
    const result = await supabase
      .from("lists")
      .insert({ name, team_id: ctx.team.id })
      .select()
      .single()

    assertValidSupabaseResult(result)

    return result.data
  },
)
