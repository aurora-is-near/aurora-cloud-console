import { adminSupabase } from "@/utils/supabase"

export const deleteContract = async (contractId: number): Promise<void> => {
  const { error } = await adminSupabase()
    .from("contracts")
    .delete()
    .eq("id", contractId)

  if (error) {
    throw error
  }
}
