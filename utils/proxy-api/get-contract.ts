import { Contract } from "@/types/types"
import { adminSupabase } from "@/utils/supabase/admin-supabase"

export const getContract = async (
  dealId: number,
  contractId: number,
): Promise<Contract> => {
  const { data: contract, error } = await adminSupabase()
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
