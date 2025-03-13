"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const getAssignedSiloIds = async (): Promise<number[]> => {
  const supabase = createAdminSupabaseClient()

  const result = await supabase
    .from("silos")
    .select("id, teams(id)")
    .not("teams", "is", null)
    .is("deleted_at", null)

  assertValidSupabaseResult(result)

  return result.data?.map((silo) => silo.id) ?? []
}
