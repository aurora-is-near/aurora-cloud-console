"use server"

import { Oracle } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getSiloOracle = async (id: number): Promise<Oracle | null> => {
  const supabase = createAdminSupabaseClient()
  const { data: oracle } = await supabase
    .from("oracles")
    .select("*")
    .eq("silo_id", id)
    .maybeSingle()

  return oracle
}
