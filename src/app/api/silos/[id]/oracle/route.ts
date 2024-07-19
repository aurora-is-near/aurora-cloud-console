import { createApiEndpoint } from "@/utils/api"
import { getSilo } from "@/actions/silos/get-silo"
import { getSiloOracle } from "@/actions/silo-oracle/get-silo-oracle"
import { createSiloOracle } from "@/actions/silo-oracle/create-silo-oracle"
import { auroraOracleApiClient } from "@/utils/aurora-oracle-api/client"
import { abort } from "../../../../../utils/abort"
import { adaptOracle } from "../../../../../utils/adapters"

export const GET = createApiEndpoint("getSiloOracle", async (_req, ctx) => {
  const siloId = Number(ctx.params.id)
  const [silo, oracle, contracts] = await Promise.all([
    getSilo(siloId),
    getSiloOracle(siloId),
    auroraOracleApiClient.getContracts(),
  ])

  if (!oracle) {
    abort(404)
  }

  const contract = contracts.items.find(
    ({ chainId }) => chainId === silo?.chain_id,
  )

  return adaptOracle(oracle, contract)
})

export const POST = createApiEndpoint("createSiloOracle", async (_req, ctx) => {
  const silo = await getSilo(Number(ctx.params.id))

  if (!silo) {
    abort(404)
  }

  const existingOracle = await getSiloOracle(silo.id)

  if (existingOracle) {
    abort(400, "Oracle already exists")
  }

  const oracle = await createSiloOracle({ silo_id: silo.id })

  return adaptOracle(oracle)
})
