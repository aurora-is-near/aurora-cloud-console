import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { abort } from "../../../../utils/abort"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const GET = createApiEndpoint(
  "getList",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()
    const { data: list } = await supabase
      .from("lists")
      .select("*")
      .eq("id", Number(ctx.params.id))
      .eq("team_id", ctx.team.id)
      .maybeSingle()

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

export const DELETE = createApiEndpoint(
  "deleteList",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()
    const result = await supabase
      .from("lists")
      .delete()
      .eq("id", Number(ctx.params.id))
      .eq("team_id", ctx.team.id)
      .single()

    assertValidSupabaseResult(result)

    return result.data
  },
)
