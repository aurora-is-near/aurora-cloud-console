"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Team } from "@/types/types"

export const updateTeam = async (
  id: number,
  inputs: Partial<Omit<Team, "id" | "created_at">>,
): Promise<void> => {
  const supabase = createAdminSupabaseClient()

  await supabase.from("teams").update(inputs).eq("id", id)
}
