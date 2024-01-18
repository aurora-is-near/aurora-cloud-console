"use server"

import { Token } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getSiloTokens = async (id: number): Promise<Token[]> => {
  const supabase = createAdminSupabaseClient()
  const { data: tokens } = await supabase
    .from("tokens")
    .select("*, silos(id)")
    .order("created_at", { ascending: true })

  return (
    tokens?.filter((token) => token.silos.some((silo) => silo.id === id)) ?? []
  )
}
