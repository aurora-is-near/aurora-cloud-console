import { Contract } from "@/types/types"
import { adminSupabase } from "@/utils/supabase"

export const getContract = async (id: number): Promise<Contract> => {
  const { data: contract, error } = await adminSupabase()
    .from("contracts")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    throw error
  }

  return contract
}
