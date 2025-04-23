"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { getCsv } from "@/utils/csv"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const getSilosReport = async () => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase.from("silos").select(
    `
        *,
        silos_teams(team_id, teams (id, name))
    `,
  )

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  const csvData = result.data.map(({ silos_teams: teams, ...restRow }) => {
    const teamNames = teams.map((team) => team.teams.name).filter(Boolean)

    return {
      ...restRow,
      teams: teamNames,
    }
  })

  return getCsv(csvData)
}
