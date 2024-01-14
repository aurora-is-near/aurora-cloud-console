import { Contract } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const getContracts = async (dealId: number): Promise<Contract[]> => {
  const result = await createAdminSupabaseClient()
    .from("contracts")
    .select("*")
    .eq("deal_id", dealId)

  assertValidSupabaseResult(result)

  return result.data
}
