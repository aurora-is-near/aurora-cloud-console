"use server"

import { SilosTeams } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const getSilosTeams = async (): Promise<SilosTeams[]> => {
  const supabase = createAdminSupabaseClient()

  const result = await supabase.from("silos_teams").select("*")

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
