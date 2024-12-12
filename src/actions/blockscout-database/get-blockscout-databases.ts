"use server"

import { BlockscoutDatabase } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { decryptBlockScoutPassword } from "@/utils/blockscout"

export const getBlockscoutDatabases = async (): Promise<
  BlockscoutDatabase[]
> => {
  const supabase = createAdminSupabaseClient()

  const { data: databases } = await supabase
    .from("blockscout_databases")
    .select("*")
    .order("id", { ascending: true })

  return (databases ?? []).map((database) => ({
    ...database,
    password: decryptBlockScoutPassword(database.password),
  }))
}
