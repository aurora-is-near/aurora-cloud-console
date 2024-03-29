import { createApiEndpoint } from "@/utils/api"
import { abort } from "../../../../../utils/abort"
import { ApiRequestBody } from "@/types/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  abortIfNoSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"
import { proxyApiClient } from "@/utils/proxy-api/client"
import { getDealUpdateOperations } from "@/utils/proxy-api/get-deal-update-operations"
import { adaptDeal } from "@/utils/adapters"
import { getDeal } from "@/utils/proxy-api/get-deal"

const parseTimeParam = (time?: string | null) => {
  if (time === null) {
    return null
  }

  if (!time) {
    return undefined
  }

  const parsed = Date.parse(time)

  if (isNaN(parsed)) {
    abort(400, `Invalid request body: time must be a date string`)
  }

  return parsed
}

const abortIfInvalidListId = (listIds: number[], listId?: number | null) => {
  if (listId && !listIds.includes(listId)) {
    abort(400, `Invalid request body: ${listId} is not a valid list ID`)
  }
}

export const GET = createApiEndpoint("getDeal", async (_req, ctx) => {
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

  abortIfNoSupabaseResult(404, dealResult)
  assertValidSupabaseResult(listsResult)

  if (!dealResult.data) {
    abort(404)
  }

  const proxyApiDeal = await getDeal(ctx.team.id, Number(ctx.params.id))

  return adaptDeal(dealResult.data, proxyApiDeal, listsResult.data)
})

export const PUT = createApiEndpoint("updateDeal", async (req, ctx) => {
  const supabase = createAdminSupabaseClient()
  const {
    enabled,
    startTime,
    endTime,
    chainFilterListId,
    contractFilterListId,
    eoaFilterListId,
    eoaBlacklistListId,
  } = ctx.body

  const [listsResult, dealsResult] = await Promise.all([
    supabase.from("lists").select("*").eq("team_id", ctx.team.id),
    supabase
      .from("deals")
      .select("*")
      .eq("id", Number(ctx.params.id))
      .eq("team_id", ctx.team.id)
      .single(),
  ])

  assertValidSupabaseResult(listsResult)
  abortIfNoSupabaseResult(404, dealsResult)

  const listIds = listsResult.data.map(({ id }) => id)

  abortIfInvalidListId(listIds, chainFilterListId)
  abortIfInvalidListId(listIds, contractFilterListId)
  abortIfInvalidListId(listIds, eoaFilterListId)
  abortIfInvalidListId(listIds, eoaBlacklistListId)

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

  const proxyApiDeal = await getDeal(ctx.team.id, Number(ctx.params.id))

  return adaptDeal(dealsResult.data, proxyApiDeal, listsResult.data)
})
