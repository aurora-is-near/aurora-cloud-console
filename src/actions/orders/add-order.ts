import { Order } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export type OrderWithRequiredFields = Pick<
  Order,
  "team_id" | "tx_hash" | "number_of_transactions" | "type" | "payment_status"
>

export const addOrder = async (
  order: OrderWithRequiredFields,
): Promise<void> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase.from("orders").insert(order).select().single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)
}
