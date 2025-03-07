"use server"

import { Token } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getSiloTokenByAddress = async (
  siloId: number,
  tokenAddress: string,
): Promise<Token | null> => {
  const supabase = createAdminSupabaseClient()
  const { data: token } = await supabase
    .from("tokens")
    .select("*")
    .eq("silo_id", siloId)
    .eq("address", tokenAddress)
    .maybeSingle()

  return token
}
