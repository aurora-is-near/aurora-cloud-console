import { NextRequest } from "next/server"
import { JsonRpcProvider } from "ethers"
import { createPrivateApiEndpoint } from "@/utils/api"
import { checkDefaultTokens } from "@/utils/healthcheck"
import { deployDefaultTokens } from "@/actions/deployment/deploy-default-tokens"
import { getSilosToInspect } from "@/actions/silos/get-silos-to-inspect"
import { Silo } from "@/types/types"
import { updateSilo } from "@/actions/silos/update-silo"

const repairSilo = async (silo: Silo) => {
  // If the silo has never been inspected mark it as such and defer to the next
  // inspection. This is to help ensure we have a chance for the user to go
  // through the onboarding process without this check kicking in at the wrong
  // moment and taking over.
  if (!silo.inspected_at) {
    await updateSilo(silo.id, { inspected_at: new Date().toISOString() })

    return
  }

  const provider = new JsonRpcProvider(silo.rpc_url)
  const defaultTokensDeployed = await checkDefaultTokens(provider, silo)

  const needsDefaultTokensDeployed = Object.values(defaultTokensDeployed).some(
    (isDeployed) => !isDeployed,
  )

  if (needsDefaultTokensDeployed) {
    await deployDefaultTokens(silo)
  }

  await updateSilo(silo.id, { inspected_at: new Date().toISOString() })
}

export const POST = createPrivateApiEndpoint(async (_req: NextRequest) => {
  const silos = await getSilosToInspect()

  await Promise.all(silos.map(async (silo) => repairSilo(silo)))

  return {
    status: 200,
    body: { message: "Repair complete" },
  }
})
