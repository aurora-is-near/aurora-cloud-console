"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Deal } from "@/types/types"
import { createDeal as createProxyApiDeal } from "@/utils/proxy-api/create-deal"
import { createDealPriority } from "@/utils/proxy-api/create-deal-priority"
import { getDealPriorities } from "@/utils/proxy-api/get-deal-priorities"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

/**
 * Give the next available priority for a deal.
 * @see https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#adding-deal-to-execution
 */
const getNextPriority = async (teamId: number): Promise<string> => {
  const prioritiesResult = await getDealPriorities(teamId)
  const priorities =
    prioritiesResult.responses?.[0]?.objects.map(({ key }) => key) ?? []

  const highestPriority = priorities.reduce((acc, priority) => {
    if (Number(priority) > Number(acc)) {
      return priority
    }

    return acc
  }, "0000")

  return String(parseInt(highestPriority, 10) + 1).padStart(4, "0")
}

/**
 * Create a deal via the ACC database and Proxy API.
 * @see https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#creating-a-deal
 */
export const createDeal = async (inputs: {
  name: string
  team_id: number
}): Promise<Deal> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("deals")
    .insert({
      name: inputs.name,
      team_id: inputs.team_id,
    })
    .select("*, teams!inner(id)")
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  if (!result.data.teams) {
    throw new Error("No team found")
  }

  await Promise.all([
    createProxyApiDeal(result.data.teams.id, result.data.id),
    createDealPriority(
      result.data.teams.id,
      result.data.id,
      await getNextPriority(inputs.team_id),
    ),
  ])

  return result.data
}
