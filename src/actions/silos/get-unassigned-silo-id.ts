"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const getUnassignedSiloId = async (): Promise<number | null> => {
  const supabase = createAdminSupabaseClient()

  const result = await supabase
    .from("silos")
    .select("id, teams(id)")
    .is("teams", null)
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle()

  assertValidSupabaseResult(result)

  return result.data?.id ?? null
}
