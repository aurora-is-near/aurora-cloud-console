import PQueue from "p-queue"
import { NextRequest } from "next/server"

import { abort } from "@/utils/abort"
import { repairSilo } from "@/utils/repair"
import { createPrivateApiEndpoint } from "@/utils/api"
import { getSilosToCheckSwapStatus } from "@/actions/silo-gas/db/get-silos-to-check-swap-status"

// A promise queue is used to avoid overwhelming the server with too many
// requests at once, which at the time of writing doesn't seem difficult.
const queue = new PQueue({ concurrency: 1 })

// This endpoint is intended to be called by a Vercel cron job, which only works
// with GET requests.
// https://vercel.com/docs/cron-jobs
export const GET = createPrivateApiEndpoint(async (req: NextRequest) => {
  if (req.headers.get("user-agent") !== "vercel-cron/1.0") {
    abort(403, "Forbidden")
  }

  const silos = await getSilosToCheckSwapStatus()

  await Promise.all(
    silos
      // TODO: Remove filter after testing
      .filter((silo) => silo.id === 103)
      .map(async (silo) => {
        await queue.add(() => repairSilo(silo))
      }),
  )

  await queue.onIdle()

  return {
    status: 200,
    body: { message: "ok" },
  }
})
