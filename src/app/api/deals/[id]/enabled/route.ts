import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { Deal, DealEnabled } from "../../../../../types/types"
import { abort } from "../../../../../utils/abort"
import { proxyApiClient } from "@/utils/proxy-api/request"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

const getVarKey = (customerId: number, dealId: number) =>
  `deal::acc::customers::${customerId}::deals::${dealId}::enabled`

export const GET = apiRequestHandler(
  ["deals:read"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()

    const result = await supabase
      .from("deals")
      .select("*, teams!inner(id, team_key)")
      .eq("id", Number(ctx.params.id))
      .single()

    assertValidSupabaseResult(result)
    assertNonNullSupabaseResult(result)

    if (
      result.data.teams?.team_key &&
      !ctx.user.scopes.includes("admin") &&
      !ctx.user.teams.includes(result.data.teams?.team_key)
    ) {
      abort(403)
    }

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

    return NextResponse.json<DealEnabled>({ enabled: result.data.enabled })
  },
)

export const PUT = apiRequestHandler(
  ["deals:write"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()
    const { enabled } = await req.json()

    const result = await supabase
      .from("deals")
      .update({ enabled })
      .eq("id", Number(ctx.params.id))
      .select("*, teams!inner(id, team_key)")
      .single()

    assertValidSupabaseResult(result)
    assertNonNullSupabaseResult(result)

    if (
      result.data.teams?.team_key &&
      !ctx.user.scopes.includes("admin") &&
      !ctx.user.teams.includes(result.data.teams?.team_key)
    ) {
      abort(403)
    }

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

    return NextResponse.json<Deal>(result.data)
  },
)
