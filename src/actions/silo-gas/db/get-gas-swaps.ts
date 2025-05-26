"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import type { SiloGasSwap } from "@/types/types"

export const getGasSwapTransactions = async ({
  silo_id,
  variant,
  status,
  startDate,
  endDate,
}: Partial<
  Omit<
    SiloGasSwap,
    "id" | "created_at" | "amount" | "status" | "deposit_address"
  >
> & {
  status: Array<SiloGasSwap["status"]>
  startDate?: string
  endDate?: string
}): Promise<SiloGasSwap[]> => {
  const supabase = createAdminSupabaseClient()
  const query = supabase.from("silo_gas_swaps").select("*")

  if (silo_id) {
    query.eq("silo_id", silo_id)
  }

  if (variant) {
    query.eq("variant", variant)
  }

  if (status) {
    query.in("status", status)
  }

  if (startDate) {
    query.gte("created_at", startDate)
  }

  if (endDate) {
    query.lte("created_at", endDate)
  }

  const result = await query.order("created_at", { ascending: false })
  assertValidSupabaseResult(result)

  return result.data
}
