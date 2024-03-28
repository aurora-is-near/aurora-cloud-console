import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Team } from "@/types/types"
import { NextRequest } from "next/server"

const findTeam = (teams: Team[], key?: string): Team | null =>
  teams.find(({ team_key }) => team_key === key) ?? null

export const getTeamKeyFromRequest = (req: NextRequest) =>
  new URL(req.url).pathname.split("/")[1]

/**
 * Get the team associated with the current request.
 */
export const findCurrentTeam = async (
  req: NextRequest,
): Promise<Team | null> => {
  const { data: teams } = await createAdminSupabaseClient()
    .from("teams")
    .select("*")

  if (!teams) {
    throw new Error("No teams found")
  }

  const teamKey = getTeamKeyFromRequest(req)
  const team = findTeam(teams, teamKey)
  const defaultTeam =
    process.env.VERCEL_ENV !== "production" &&
    findTeam(teams, process.env.DEFAULT_TEAM_KEY)

  if (team) {
    return team
  }

  if (!defaultTeam) {
    return null
  }

  return defaultTeam
}

/**
 * Get the team associated with the current subdomain.
 */
export const getCurrentTeamFromHeaders = async (
  req: NextRequest,
): Promise<Team> => {
  const currentTeam = await findCurrentTeam(req)

  if (!currentTeam) {
    throw new Error(
      "No team or default team could be established for the current request",
    )
  }

  return currentTeam
}
