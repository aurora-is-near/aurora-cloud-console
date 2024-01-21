import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { abort } from "../../../../../utils/abort"
import { proxyApiClient } from "@/utils/proxy-api/request"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import { getDealVarKey } from "../../../../../utils/proxy-api/get-deal-var-key"
import { ApiRequestContext } from "@/types/api"

export const GET = createApiEndpoint(
  "getDealStartTime",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()

    const result = await supabase
      .from("deals")
      .select("*, teams!inner(id, team_key)")
      .eq("id", Number(ctx.params.id))
      .eq("teams.team_key", ctx.team.team_key)
      .maybeSingle()

    assertValidSupabaseResult(result)

    if (!result.data) {
      abort(404)
    }

    // TODO: Use this instead of the ACC column (which should be deleted
    // when the proxy API is ready)
    await proxyApiClient.view([
      {
        var_type: "number",
        key: getDealVarKey(ctx.team.id, Number(ctx.params.id), "enabled"),
      },
    ])

    return {
      startTime: result.data.start_time
        ? new Date(result.data.start_time)
        : null,
    }
  },
)

export const POST = createApiEndpoint(
  "setDealStartTime",
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()
    const { startTime } = await req.json()
    const unixStartTime = Date.parse(startTime)

    if (isNaN(unixStartTime)) {
      abort(400, `Not a valid date: ${startTime}`)
    }

    // TODO: Replace this with a check to see if the deal exists in the Proxy API
    // for the given team and deal IDs, 404 otherwise.
    const result = await supabase
      .from("deals")
      .update({ start_time: unixStartTime })
      .eq("id", Number(ctx.params.id))
      .eq("team_id", ctx.team.id)
      .select()
      .maybeSingle()

    assertValidSupabaseResult(result)

    if (!result.data) {
      abort(404)
    }

    const varKey = getDealVarKey(
      ctx.team.id,
      Number(ctx.params.id),
      "startTime",
    )

    // TODO: Use this instead of the ACC column (which should be deleted
    // when the proxy API is ready)
    await proxyApiClient.update([
      {
        op_type: "set",
        var_type: "number",
        var_key: varKey,
        template_key: "template::deal::acc::time",
      },
      {
        op_type: "set_value",
        var_type: "number",
        var_key: varKey,
        number_value: unixStartTime,
      },
    ])

    return { startTime: new Date(unixStartTime) }
  },
)

export const DELETE = createApiEndpoint(
  "deleteDealStartTime",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()

    // TODO: Replace this with a check to see if the deal exists in the Proxy API
    // for the given team and deal IDs, 404 otherwise.
    const result = await supabase
      .from("deals")
      .update({ start_time: null })
      .eq("id", Number(ctx.params.id))
      .eq("team_id", ctx.team.id)
      .select()
      .maybeSingle()

    assertValidSupabaseResult(result)

    if (!result.data) {
      abort(404)
    }

    // TODO: Use this instead of the ACC column (which should be deleted
    // when the proxy API is ready)
    await proxyApiClient.update([
      {
        op_type: "unset",
        var_type: "number",
        var_key: getDealVarKey(ctx.team.id, Number(ctx.params.id), "startTime"),
      },
    ])

    return null
  },
)
