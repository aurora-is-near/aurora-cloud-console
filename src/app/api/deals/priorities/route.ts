import { createApiEndpoint } from "@/utils/api"
import { abort } from "../../../../utils/abort"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import { getDealPriorities } from "@/utils/proxy-api/get-deal-priorities"
import { createDealPriority } from "@/utils/proxy-api/create-deal-priority"
import { removeDealPriority } from "@/utils/proxy-api/remove-deal-priority"

/**
 * Get a map of deal IDs to their priorities.
 */
const getPriorityMap = async (teamId: number) => {
  const prioritiesResult = await getDealPriorities(teamId)

  const priorityKeys =
    prioritiesResult.responses?.[0].objects.map(({ key }) => key) ?? []

  const priorityValues =
    prioritiesResult.responses?.[1].objects.map(
      ({ Data }) => Data.StringVar?.value,
    ) ?? []

  return priorityValues.reduce<Record<number, string>>((acc, key, index) => {
    if (key) {
      acc[Number(key)] = priorityKeys[index]
    }

    return acc
  }, {})
}

/**
 * Clean up outdated deal priorities.
 *
 * If a deal was deleted but the priority pointer was not removed this can
 * causes issues when trying to set a new deal to use that priority.
 */
const deleteOutdatedDealPriorities = async (
  teamId: number,
  existingDealIds: number[],
) => {
  const priorityMap = await getPriorityMap(teamId)

  await Promise.all(
    Object.entries(priorityMap).map(async ([dealId, priority]) => {
      if (!existingDealIds.includes(Number(dealId))) {
        await removeDealPriority(teamId, priority)
      }
    }),
  )
}

export const GET = createApiEndpoint("getDealPriorities", async (_req, ctx) => {
  const supabase = createAdminSupabaseClient()

  const [dealsResult, priorityMap] = await Promise.all([
    supabase
      .from("deals")
      .select("id, name, team_id")
      .eq("team_id", ctx.team.id),
    getPriorityMap(ctx.team.id),
  ])

  assertValidSupabaseResult(dealsResult)

  if (!dealsResult.data) {
    abort(404)
  }

  return {
    items: dealsResult.data.map((deal) => ({
      dealId: deal.id,
      name: deal.name,
      priority: priorityMap[deal.id],
    })),
  }
})

export const PUT = createApiEndpoint(
  "updateDealPriorities",
  async (_req, ctx) => {
    const supabase = createAdminSupabaseClient()
    const { priorities } = ctx.body

    const dealsResult = await supabase
      .from("deals")
      .select("id, name, team_id")
      .eq("team_id", ctx.team.id)

    await deleteOutdatedDealPriorities(
      ctx.team.id,
      dealsResult.data?.map((deal) => deal.id) ?? [],
    )

    const priorityMap = await getPriorityMap(ctx.team.id)
    const newPriorityMap: Record<number, string> = {}

    // Validate priorities for the set of deals to be updated
    priorities.forEach(({ dealId, priority }, _index, arr) => {
      const deal = dealsResult.data?.find((deal) => deal.id === dealId)

      if (!deal) {
        abort(400, `No deal found with id ${dealId}`)
      }

      if (!priority) {
        abort(400, `No priority provided for deal ${dealId}`)
      }

      // Priority must match format 0001, 0002, 0003, etc.
      if (!priority.match(/^[0-9]{4}$/)) {
        abort(400, `Invalid priority: ${priority}`)
      }

      newPriorityMap[dealId] = priority
    })

    // Validate that the same priority is not used for multiple deals
    const usedPriorities = Object.values({ ...priorityMap, ...newPriorityMap })
    const duplicatePriorities = usedPriorities.filter(
      (priority) =>
        !!priority &&
        usedPriorities.indexOf(priority) !==
          usedPriorities.lastIndexOf(priority),
    )

    if (duplicatePriorities.length) {
      abort(
        400,
        `Duplicate priorities found: ${[...new Set(duplicatePriorities)].join(
          ", ",
        )}`,
      )
    }

    assertValidSupabaseResult(dealsResult)

    if (!dealsResult.data) {
      abort(404)
    }

    await Promise.all(
      Object.entries(newPriorityMap).map(async ([dealId, priority]) => {
        createDealPriority(ctx.team.id, Number(dealId), priority)
      }),
    )

    const dealNames = dealsResult.data.reduce<Record<number, string>>(
      (acc, deal) => ({
        ...acc,
        [deal.id]: deal.name,
      }),
      {},
    )

    return {
      items: priorities.map((priority) => ({
        dealId: priority.dealId,
        name: dealNames[priority.dealId],
        priority: priority.priority,
      })),
    }
  },
)
