import { NextRequest } from "next/server"
import { ApiRequestContext, createApiEndpoint } from "@/utils/api"
import { abort } from "../../../../../utils/abort"
import { proxyApiClient } from "@/utils/proxy-api/request"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

const getVarKey = (customerId: number, dealId: number) =>
  `deal::acc::customers::${customerId}::deals::${dealId}::enabled`

export const GET = createApiEndpoint(
  "getDealEnabled",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()

    const result = await supabase
      .from("deals")
      .select("*, teams!inner(id, team_key)")
      .eq("id", Number(ctx.params.id))
      .eq("teams.team_key", ctx.teamKey)
      .single()

    assertValidSupabaseResult(result)
    assertNonNullSupabaseResult(result)

    if (!result.data.teams) {
      abort(500, "No team found")
    }

    // TODO: Use this instead of the ACC column (which should be deleted
    // when the proxy API is ready)
    await proxyApiClient.view([
      {
        var_type: "number",
        key: getVarKey(result.data.teams.id, result.data.id),
      },
    ])

    return {
      enabled: result.data.enabled,
    }
  },
)

export const PUT = createApiEndpoint(
  "updateDealEnabled",
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()
    const { enabled } = await req.json()

    const result = await supabase
      .from("deals")
      .update({ enabled })
      .eq("id", Number(ctx.params.id))
      .eq("teams.team_key", ctx.teamKey)
      .select("*, teams!inner(id, team_key)")
      .single()

    assertValidSupabaseResult(result)
    assertNonNullSupabaseResult(result)

    if (!result.data.teams) {
      abort(500, "No team found")
    }

    await proxyApiClient.update([
      {
        op_type: "set_value",
        var_type: "number",
        var_key: getVarKey(result.data.teams.id, result.data.id),
        number_value: enabled ? 1 : 0,
      },
    ])

    return result.data
  },
)
