import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { NextRequest } from "next/server"

const getSubdomain = (req: NextRequest): string | undefined => {
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host")

  if (!host) {
    return
  }

  const hostname = host.split(":")[0]
  const hostnameParts = hostname.split(".")

  if (hostnameParts.length !== 3) {
    return
  }

  return hostnameParts[0]
}

export const getTeamKey = async (req: NextRequest): Promise<string | null> => {
  const { data: teams } = await createAdminSupabaseClient()
    .from("teams")
    .select("team_key")

  const teamKeys = teams?.map((team) => team.team_key) ?? []
  const subdomain = getSubdomain(req)

  if (!subdomain || !teamKeys.includes(subdomain)) {
    return process.env.DEFAULT_TEAM_KEY ?? null
  }

  return subdomain
}
