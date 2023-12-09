import { NextRequest } from "next/server"

export const getTeamKey = (req: NextRequest) => {
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host")

  if (!host) {
    return null
  }

  const hostname = host.split(":")[0]

  if (["localhost", "127.0.0.1"].includes(hostname)) {
    return process.env.DEFAULT_TEAM_KEY
  }

  const hostnameParts = hostname.split(".")

  if (hostnameParts.length !== 3) {
    return null
  }

  return hostnameParts[0]
}
