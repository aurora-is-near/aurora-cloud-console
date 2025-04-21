"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { getCsv } from "@/utils/csv"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const getOnboardingReport = async () => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase.from("onboarding_form").select(
    `
        *,
        teams (
            name,
            users_teams (
                user:users (email)
            )
        )
    `,
  )

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  const csvData = result.data.map(({ teams: team, ...restRow }) => {
    if (!team) {
      return restRow
    }

    const emails = team.users_teams
      .map((userTeam) => userTeam.user?.email)
      .filter(Boolean)

    return {
      ...restRow,
      team_name: team.name,
      team_user_emails: emails,
    }
  })

  return getCsv(csvData)
}
