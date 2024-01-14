import { Contract } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const getContract = async (
  dealId: number,
  contractId: number,
): Promise<Contract> => {
  const result = await createAdminSupabaseClient()
    .from("contracts")
    .select("*")
    .eq("deal_id", dealId)
    .eq("id", contractId)
    .single()

  assertValidSupabaseResult(result)

  return result.data
}
