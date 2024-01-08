"use server"

import { Silo, SiloWithRelationships } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getSilo = async (
  id: number,
): Promise<SiloWithRelationships | null> => {
  const supabase = createAdminSupabaseClient()

  const [{ data: silo }, { data: tokens }] = await Promise.all([
    supabase
      .from("silos")
      .select("*, team:teams!inner(*)")
      .order("created_at")
      .eq("id", id)
      .single(),
    supabase
      .from("tokens")
      .select("*, silos_tokens!inner(silo_id)")
      .eq("silos_tokens.silo_id", id),
  ])

  if (!silo) {
    return null
  }

  return {
    ...silo,
    tokens: tokens ?? [],
  }
}
