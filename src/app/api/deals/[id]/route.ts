import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { abort } from "../../../../utils/abort"
import { ApiRequestBody, ApiRequestContext } from "@/types/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"
import { proxyApiClient } from "@/utils/proxy-api/client"
import { getDealViewOperations } from "@/utils/proxy-api/get-deal-view-operations"
import { getDealUpdateOperations } from "@/utils/proxy-api/get-deal-update-operations"
import { adaptDeal } from "@/utils/adapters"

const parseTimeParam = (time?: string | null) => {
  if (time === null) {
    return null
  }

  if (!time) {
    return undefined
  }

  const parsed = Date.parse(time)

  if (isNaN(parsed)) {
    abort(400, `Invalid request body: startTime must be a date string`)
  }

  return parsed
}

const assertValidListId = (listIds: number[], listId?: number | null) => {
  if (listId && !listIds.includes(listId)) {
    abort(400, `Invalid request body: ${listId} is not a valid list ID`)
  }
}

export const GET = createApiEndpoint(
  "getDeal",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()
    const [dealResult, listsResult] = await Promise.all([
      supabase
        .from("deals")
        .select("*")
        .eq("id", Number(ctx.params.id))
        .eq("team_id", ctx.team.id)
        .maybeSingle(),
      supabase.from("lists").select("*").eq("team_id", ctx.team.id),
    ])

    assertValidSupabaseResult(dealResult)
    assertValidSupabaseResult(listsResult)

    if (!dealResult.data) {
      abort(404)
    }

    // TODO: Use this instead of the ACC database, when the Proxy API is ready
    await proxyApiClient.view(
      getDealViewOperations(ctx.team.id, Number(ctx.params.id)),
    )

    return adaptDeal(dealResult.data, listsResult.data)
  },
)

export const PUT = createApiEndpoint(
  "updateDeal",
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()
    const {
      enabled,
      startTime,
      endTime,
      chainFilterListId,
      contractFilterListId,
      eoaFilterListId,
      eoaBlacklistListId,
    } = (await req.json()) as ApiRequestBody<"updateDeal">

    if (typeof enabled !== "undefined" && typeof enabled !== "boolean") {
      abort(400, "Invalid request body: enabled must be a boolean")
    }

    const listsResult = await supabase
      .from("lists")
      .select("*")
      .eq("team_id", ctx.team.id)

    assertValidSupabaseResult(listsResult)

    const listIds = listsResult.data.map(({ id }) => id)

    assertValidListId(listIds, chainFilterListId)
    assertValidListId(listIds, contractFilterListId)
    assertValidListId(listIds, eoaFilterListId)
    assertValidListId(listIds, eoaBlacklistListId)

    const dealsResult = await supabase
      .from("deals")
      .update({
        enabled,
        start_time: parseTimeParam(startTime),
        end_time: parseTimeParam(endTime),
        chain_filter_list_id: chainFilterListId,
        contract_filter_list_id: contractFilterListId,
        eoa_filter_list_id: eoaFilterListId,
        eoa_blacklist_list_id: eoaBlacklistListId,
      })
      .eq("id", Number(ctx.params.id))
      .eq("team_id", ctx.team.id)
      .select("*")
      .single()

    assertValidSupabaseResult(dealsResult)

    // TODO: Use this instead of the ACC database, when the Proxy API is ready
    await proxyApiClient.update(
      getDealUpdateOperations(ctx.team.id, Number(ctx.params.id), {
        enabled,
        startTime: parseTimeParam(startTime),
        endTime: parseTimeParam(endTime),
        lists: {
          chainFilter: chainFilterListId,
          contractFilter: contractFilterListId,
          eoaFilter: eoaFilterListId,
          eoaBlacklist: eoaBlacklistListId,
        },
      }),
    )

    await proxyApiClient.view(
      getDealViewOperations(ctx.team.id, Number(ctx.params.id)),
    )

    return adaptDeal(dealsResult.data, listsResult.data)
  },
)
