import { Contract } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const addContract = async (
  dealId: number,
  name: string,
  address: string,
): Promise<Contract> => {
  const result = await createAdminSupabaseClient()
    .from("contracts")
    .insert({ deal_id: dealId, name, address })
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
