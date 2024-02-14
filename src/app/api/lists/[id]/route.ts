import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { ApiRequestBody, ApiRequestContext } from "@/types/api"
import { abort } from "../../../../utils/abort"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import { adaptList } from "@/utils/adapters"
import { deleteList } from "@/utils/proxy-api/delete-list"

export const GET = createApiEndpoint(
  "getList",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()
    const [{ data: list }] = await Promise.all([
      supabase
        .from("lists")
        .select("*")
        .eq("id", Number(ctx.params.id))
        .eq("team_id", ctx.team.id)
        .maybeSingle(),
    ])

    if (!list) {
      abort(404)
    }

    return adaptList(list)
  },
)

export const PUT = createApiEndpoint(
  "updateList",
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const { name } = (await req.json()) as ApiRequestBody<"updateList">
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

    return adaptList(result.data)
  },
)

export const DELETE = createApiEndpoint(
  "deleteList",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()
    const [result] = await Promise.all([
      supabase
        .from("lists")
        .delete()
        .eq("id", Number(ctx.params.id))
        .eq("team_id", ctx.team.id),
      deleteList(ctx.team.id, Number(ctx.params.id)),
    ])

    assertValidSupabaseResult(result)

    return null
  },
)
