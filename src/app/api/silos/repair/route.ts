import { NextRequest } from "next/server"
import { JsonRpcProvider } from "ethers"
import { createPrivateApiEndpoint } from "@/utils/api"
import { checkDefaultTokens } from "@/utils/healthcheck"
import { deployDefaultTokens } from "@/actions/deployment/deploy-default-tokens"
import { getSilosToInspect } from "@/actions/silos/get-silos-to-inspect"
import { Silo } from "@/types/types"

const repairSilo = async (silo: Silo) => {
  const provider = new JsonRpcProvider(silo.rpc_url)
  const defaultTokensDeployed = await checkDefaultTokens(provider, silo)

  const needsDefaultTokensDeployed = Object.values(defaultTokensDeployed).some(
    (isDeployed) => !isDeployed,
  )

  if (needsDefaultTokensDeployed) {
    await deployDefaultTokens(silo)
  }
}

export const POST = createPrivateApiEndpoint(async (_req: NextRequest) => {
  const silos = await getSilosToInspect()

  await Promise.all(silos.map(async (silo) => repairSilo(silo)))

  return {
    status: 200,
    body: { message: "Repair complete" },
  }
})
