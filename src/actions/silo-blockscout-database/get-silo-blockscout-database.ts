"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { BlockscoutDatabase } from "@/types/types"

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
    database: database.database,
    host: database.host,
    id: database.id,
    name: database.name,
    password: database.password,
    port: database.port,
    user: database.user,
  }
}
