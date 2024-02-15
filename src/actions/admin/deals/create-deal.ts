"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Deal } from "@/types/types"
import { createDeal as createProxyApiDeal } from "@/utils/proxy-api/create-deal"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

const getExtendPrioritiesOperations = (
  customerId: number,
  dealId: number,
  priority: string,
) => {
  return [
    {
      // Create priority -> ID pointer
      op_type: "set",
      var_type: "string",
      var_key: `deal::acc::customers::${customerId}::dealByPrio::${priority}`,
      template_key: "template::deal::acc::pointer",
    },
    {
      // Populate priority -> ID pointer
      op_type: "set_value",
      var_type: "string",
      var_key: `deal::acc::customers::${customerId}::dealByPrio::${priority}`,
      string_var: dealId,
    },
    {
      // Add priority to the execution list
      op_type: "insert",
      var_type: "set",
      var_key: `deal::acc::customers::${customerId}::dealPrios`,
      set_element: priority,
    },
  ]
}

/**
 * Give the next available priority for a deal.
 * @see https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#adding-deal-to-execution
 */
const getNextPriority = async (teamId: number): Promise<string> => {
  const supabase = createAdminSupabaseClient()

  // TODO: Take this from the Proxy API
  const result = await supabase
    .from("deals")
    .select("priority, team_id")
    .eq("team_id", teamId)

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  const highestPriority = result.data.reduce((acc, deal) => {
    if (deal.priority > acc) {
      return deal.priority
    }

    return acc
  }, "0000")

  return String(parseInt(highestPriority) + 1).padStart(4, "0")
}

/**
 * Create a deal via the ACC database and Proxy API.
 * @see https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#creating-a-deal
 */
export const createDeal = async (
  inputs: Omit<Deal, "id" | "created_at" | "priority">,
): Promise<Deal> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("deals")
    .insert({
      ...inputs,
      // TODO: Replace this with
      // https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#approach-1-extending
      priority: await getNextPriority(inputs.team_id),
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
    getExtendPrioritiesOperations(
      result.data.teams.id,
      result.data.id,
      result.data.priority,
    ),
  ])

  return result.data
}
