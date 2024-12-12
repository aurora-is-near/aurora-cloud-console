"use server"

import { BlockscoutDatabase } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { decryptBlockScoutPassword } from "@/utils/blockscout"

export const getBlockscoutDatabase = async (
  id: number,
): Promise<BlockscoutDatabase | null> => {
  const supabase = createAdminSupabaseClient()

  const { data: database } = await supabase
    .from("blockscout_databases")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (!database) {
    return null
  }

  return {
    ...database,
    password: decryptBlockScoutPassword(database.password),
  }
}
