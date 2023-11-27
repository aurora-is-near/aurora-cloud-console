import { adminSupabase } from "@/utils/supabase"

export const deleteContract = async (
  dealId: number,
  contractId: number,
): Promise<void> => {
  const { error } = await adminSupabase()
    .from("contracts")
    .delete()
    .eq("deal_id", dealId)
    .eq("id", contractId)

  if (error) {
    throw error
  }
}
