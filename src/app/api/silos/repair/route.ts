import { NextRequest } from "next/server"
import PQueue from "p-queue"
import { createPrivateApiEndpoint } from "@/utils/api"
import { getSilosToInspect } from "@/actions/silos/get-silos-to-inspect"
import { abort } from "@/utils/abort"
import { repairSilo } from "@/utils/repair"

const queue = new PQueue({ concurrency: 3 })

// This endpoint is intended to be called by a Vercel cron job, which only works
// with GET requests.
// https://vercel.com/docs/cron-jobs
export const GET = createPrivateApiEndpoint(async (req: NextRequest) => {
  if (req.headers.get("user-agent") !== "vercel-cron/1.0") {
    abort(403, "Forbidden")
  }

  const silos = await getSilosToInspect()

  await Promise.all(
    silos.map(async (silo) => {
      await queue.add(() => repairSilo(silo))
    }),
  )

  await queue.onIdle()

  return {
    status: 200,
    body: { message: "ok" },
  }
})
