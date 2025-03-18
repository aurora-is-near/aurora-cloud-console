"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Silo } from "@/types/types"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const getSilosToInspect = async (): Promise<Silo[]> => {
  const supabase = createAdminSupabaseClient()

  const result = await supabase
    .from("silos")
    .select("*, teams(id)")
    .not("teams", "is", null)
    .is("deleted_at", null)
    .order("inspected_at", { ascending: true, nullsFirst: true })

  assertValidSupabaseResult(result)

  return result.data ?? []
}
