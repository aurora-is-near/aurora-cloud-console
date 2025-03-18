import { NextRequest } from "next/server"
import PQueue from "p-queue"
import { createPrivateApiEndpoint } from "@/utils/api"
import { deployDefaultTokens } from "@/actions/deployment/deploy-default-tokens"
import { getSilosToInspect } from "@/actions/silos/get-silos-to-inspect"
import { Silo } from "@/types/types"
import { updateSilo } from "@/actions/silos/update-silo"
import { setBaseToken } from "@/actions/deployment/set-base-token"

const queue = new PQueue({ concurrency: 3 })

const repairSilo = async (silo: Silo) => {
  // If the silo has never been inspected mark it as such and defer to the next
  // inspection. This is to help ensure we have a chance for the user to go
  // through the onboarding process without this check interrupting and taking
  // over before they have a chance to do so.
  if (!silo.inspected_at) {
    await updateSilo(silo.id, { inspected_at: new Date().toISOString() })

    return
  }

  const isWithin24Hours =
    Date.now() - new Date(silo.inspected_at).getTime() < 24 * 60 * 60 * 1000

  const results = await Promise.all([
    deployDefaultTokens(silo, { skipIfFailed: isWithin24Hours }),
    setBaseToken(silo, { skipIfFailed: isWithin24Hours }),
  ])

  const siloUpdateProperties: Partial<Silo> = {
    inspected_at: new Date().toISOString(),
  }

  // If the silo has never been marked as active, mark it as such.
  if (!silo.is_active && results.every((result) => result === "SUCCESSFUL")) {
    siloUpdateProperties.is_active = true
  }

  await updateSilo(silo.id, siloUpdateProperties)
}

export const POST = createPrivateApiEndpoint(async (_req: NextRequest) => {
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
