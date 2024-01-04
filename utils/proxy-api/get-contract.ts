import { Contract } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getContract = async (
  dealId: number,
  contractId: number,
): Promise<Contract> => {
  const { data: contract, error } = await createAdminSupabaseClient()
    .from("contracts")
    .select("*")
    .eq("deal_id", dealId)
    .eq("id", contractId)
    .single()

  if (error) {
    throw error
  }

  return contract
}
