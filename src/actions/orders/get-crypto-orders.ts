"use server"

import { Order } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertValidSupabaseResult,
  assertNonNullSupabaseResult,
} from "@/utils/supabase"

export const getCryptoOrders = async (
  teamId: number | undefined,
): Promise<Order[] | []> => {
  const supabase = createAdminSupabaseClient()
  const query = supabase
    .from("orders")
    .select("*")
    .order("id")
    .neq("tx_hash", null)
  if (teamId) {
    query.eq("team_id", teamId)
  }
  const result = await query
  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)
  if (!result.data) {
    return []
  }
  return result.data
}
