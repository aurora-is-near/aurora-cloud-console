"use server"

import { Silo } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getSiloByChainId = async (
  chainId: string,
): Promise<Silo | null> => {
  const supabase = createAdminSupabaseClient()

  const { data: silo } = await supabase
    .from("silos")
    .select("*")
    .eq("chain_id", chainId)
    .maybeSingle()

  return silo
}
