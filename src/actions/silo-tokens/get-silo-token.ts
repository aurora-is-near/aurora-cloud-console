"use server"

import { Token } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getSiloToken = async (
  siloId: number,
  tokenId: number,
): Promise<Token | null> => {
  const supabase = createAdminSupabaseClient()
  const { data: token } = await supabase
    .from("tokens")
    .select("*")
    .eq("id", tokenId)
    .eq("silo_id", siloId)
    .maybeSingle()

  return token
}
