import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const deleteContract = async (
  dealId: number,
  contractId: number,
): Promise<void> => {
  const { error } = await createAdminSupabaseClient()
    .from("contracts")
    .delete()
    .eq("deal_id", dealId)
    .eq("id", contractId)

  if (error) {
    throw error
  }
}
