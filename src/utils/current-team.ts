import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Team } from "@/types/types"
import { NextApiRequest } from "next"
import { NextRequest } from "next/server"

const findTeam = (teams: Team[], key?: string): Team | null =>
  teams.find(({ team_key }) => team_key === key) ?? null

export const getTeamKeyFromRequest = (req: NextRequest | NextApiRequest) => {
  const { url } = req

  if (!url) {
    throw new Error("No URL found in the request")
  }

  return new URL(url).pathname.split("/")[1]
}

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

  return team
}
