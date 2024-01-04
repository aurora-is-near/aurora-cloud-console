import { Contract } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getContracts = async (dealId: number): Promise<Contract[]> => {
  const { data: contracts, error } = await createAdminSupabaseClient()
    .from("contracts")
    .select("*")
    .eq("deal_id", dealId)

  if (error) {
    throw error
  }

  return contracts
}
