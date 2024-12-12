"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { BlockscoutDatabase } from "@/types/types"
import { decryptBlockScoutPassword } from "@/utils/blockscout"

export const getSiloBlockScoutDatabase = async (
  siloId: number,
): Promise<BlockscoutDatabase | null> => {
  const supabase = createAdminSupabaseClient()
  const { data: database } = await supabase
    .from("blockscout_databases")
    .select("*, silos!inner(id)")
    .eq("silos.id", siloId)
    .maybeSingle()

  if (!database) {
    return null
  }

  return {
    ...database,
    password: decryptBlockScoutPassword(database.password),
  }
}
