import { NextRequest } from "next/server"
import PQueue from "p-queue"
import { processTeamTx } from "@/actions/teams-funding/process-team-tx"
import { getTeams } from "@/actions/teams/get-teams"
import { abort } from "@/utils/abort"

// check crypto transactions for gas abstraction top-ups

// This endpoint is intended to be called by a Vercel cron job, which only works
// with GET requests.
// https://vercel.com/docs/cron-jobs
const queue = new PQueue({ concurrency: 1 })

export const GET = async (req: NextRequest) => {
  // if (req.headers.get("user-agent") !== "vercel-cron/1.0") {
  //   abort(403, "Forbidden")
  // }
  const teams = await getTeams()
  await Promise.all(
    teams.map(async (team) => {
      await queue.add(() => processTeamTx(team))
    }),
  )
  return new Response("ok")
}
