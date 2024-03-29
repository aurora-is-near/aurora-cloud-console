import { createApiEndpoint } from "@/utils/api"
import { abort } from "../../../../../../utils/abort"
import { getSilo } from "@/actions/silos/get-silo"
import { getSiloOracle } from "@/actions/silo-oracle/get-silo-oracle"
import { createSiloOracle } from "@/actions/silo-oracle/create-silo-oracle"
import { Oracle } from "@/types/types"
import { OracleSchema } from "@/types/api-schemas"

const getOracleSchema = (oracle?: Oracle): OracleSchema => {
  if (!oracle) {
    return {
      enabled: false,
      createdAt: null,
      updatedAt: null,
      deployedAt: null,
    }
  }

  return {
    enabled: true,
    createdAt: oracle.created_at,
    updatedAt: oracle.updated_at,
    deployedAt: oracle.deployed_at,
  }
}

export const GET = createApiEndpoint("getSiloOracle", async (_req, ctx) => {
  const silo = await getSilo(Number(ctx.params.id))

  if (!silo) {
    abort(404)
  }

  const oracle = await getSiloOracle(silo.id)

  if (!oracle) {
    return getOracleSchema()
  }

  return getOracleSchema(oracle)
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

  return getOracleSchema(oracle)
})
