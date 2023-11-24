import { Contract } from "@/types/types"
import { adminSupabase } from "@/utils/supabase"

export const getContracts = async (dealId: number): Promise<Contract[]> => {
  const { data: contracts, error } = await adminSupabase()
    .from("contracts")
    .select("*")
    .eq("deal_id", dealId)

  if (error) {
    throw error
  }

  return contracts
}
