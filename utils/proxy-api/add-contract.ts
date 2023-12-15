import { Contract } from "@/types/types"
import { adminSupabase } from "@/utils/supabase/admin-supabase"

export const addContract = async (
  dealId: number,
  name: string,
  address: string,
): Promise<Contract> => {
  const { data: contract, error } = await adminSupabase()
    .from("contracts")
    .insert({ deal_id: dealId, name, address })
    .select()
    .single()

  if (error) {
    throw error
  }

  return contract
}
