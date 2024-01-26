import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Team } from "@/types/types"
import { getSubdomain } from "@/utils/subdomain"

const findTeamDetails = (teams: Team[], key?: string): Team | null =>
  teams.find(({ team_key }) => team_key === key) ?? null

/**
 * Get the team associated with the current subdomain.
 */
export const getCurrentTeam = async (headers: Headers) => {
  const { data: teams } = await createAdminSupabaseClient()
    .from("teams")
    .select("*")

  if (!teams) {
    throw new Error("No teams found")
  }

  const subdomain = getSubdomain(headers)
  const teamForSubdomain = findTeamDetails(teams, subdomain)
  const defaultTeam = findTeamDetails(teams, process.env.DEFAULT_TEAM_KEY)

  if (teamForSubdomain) {
    return teamForSubdomain
  }

  if (!defaultTeam) {
    throw new Error(
      "No team or default team could be established for the current request",
    )
  }

  return defaultTeam
}
