import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { abort } from "../../../../utils/abort"
import { getTeamList } from "@/actions/admin/team-lists/get-team-list"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

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

    const supabase = createAdminSupabaseClient()
    const result = await supabase
      .from("lists")
      .update({ name })
      .eq("id", Number(ctx.params.id))
      .eq("team_id", ctx.team.id)
      .select()
      .single()

    assertValidSupabaseResult(result)

    if (!result.data) {
      abort(404)
    }

    return result.data
  },
)
