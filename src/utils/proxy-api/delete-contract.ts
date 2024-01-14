import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const deleteContract = async (
  dealId: number,
  contractId: number,
): Promise<void> => {
  const result = await createAdminSupabaseClient()
    .from("contracts")
    .delete()
    .eq("deal_id", dealId)
    .eq("id", contractId)

  assertValidSupabaseResult(result)
}
