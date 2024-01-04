import { Contract } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const addContract = async (
  dealId: number,
  name: string,
  address: string,
): Promise<Contract> => {
  const { data: contract, error } = await createAdminSupabaseClient()
    .from("contracts")
    .insert({ deal_id: dealId, name, address })
    .select()
    .single()

  if (error) {
    throw error
  }

  return contract
}
