import { NextRequest } from "next/server"
import { JsonRpcProvider } from "ethers"
import { createPrivateApiEndpoint } from "@/utils/api"
import { getSilo } from "@/actions/silos/get-silo"
import { checkDefaultTokens } from "@/utils/healthcheck"
import { deployDefaultTokens } from "@/actions/deployment/deploy-default-tokens"
import { getAssignedSiloIds } from "@/actions/silos/get-assigned-silo-ids"

export const POST = createPrivateApiEndpoint(async (_req: NextRequest) => {
  const siloIds = await getAssignedSiloIds()

  // TODO: Make this run against all silos
  await Promise.all(
    siloIds.slice(0, 1).map(async (siloId) => {
      const silo = await getSilo(siloId)

      if (!silo) {
        throw new Error(`Silo with id ${siloId} not found`)
      }

      const provider = new JsonRpcProvider(silo.rpc_url)
      const defaultTokensDeployed = await checkDefaultTokens(provider, silo)

      const needsDefaultTokensDeployed = Object.values(
        defaultTokensDeployed,
      ).some((isDeployed) => !isDeployed)

      if (needsDefaultTokensDeployed) {
        await deployDefaultTokens(silo)
      }
    }),
  )
})
