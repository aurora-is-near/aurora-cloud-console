import { createApiEndpoint } from "@/utils/api"
import { abort } from "../../../../../utils/abort"
import { getSilo } from "@/actions/silos/get-silo"
import { getSiloBridge } from "@/actions/silo-bridge/get-silo-bridge"
import { createSiloBridge } from "@/actions/silo-bridge/create-silo-bridge"
import { Bridge, BridgeNetworkType } from "@/types/types"
import { BridgeSchema } from "@/types/api-schemas"
import { updateSiloBridge } from "@/actions/silo-bridge/update-silo-bridge"
import { isValidNetwork } from "@/utils/bridge"

const getValidNetworks = (networks: string[]): BridgeNetworkType[] => {
  const validNetworks = networks.filter(isValidNetwork)
  const invalidNetworks = networks.filter((network) => !isValidNetwork(network))

  if (invalidNetworks.length) {
    abort(400, `Invalid network(s): ${invalidNetworks.join(", ")}`)
  }

  return validNetworks
}

const getBridgeSchema = (bridge?: Bridge): BridgeSchema => {
  if (!bridge) {
    return {
      enabled: false,
      createdAt: null,
      updatedAt: null,
      fromNetworks: null,
      toNetworks: null,
      tokens: [],
    }
  }

  return {
    enabled: true,
    createdAt: bridge.created_at,
    updatedAt: bridge.updated_at,
    fromNetworks: bridge.from_networks,
    toNetworks: bridge.to_networks,
    tokens: bridge.tokens,
  }
}

export const GET = createApiEndpoint("getSiloBridge", async (_req, ctx) => {
  const bridge = await getSiloBridge(Number(ctx.params.id))

  if (!bridge) {
    return getBridgeSchema()
  }

  return getBridgeSchema(bridge)
})

export const POST = createApiEndpoint("createSiloBridge", async (_req, ctx) => {
  const silo = await getSilo(Number(ctx.params.id))

  if (!silo) {
    abort(404)
  }

  const existingBridge = await getSiloBridge(silo.id)

  if (existingBridge) {
    abort(400, "Bridge already exists")
  }

  const bridge = await createSiloBridge({ silo_id: silo.id })

  return getBridgeSchema(bridge)
})

export const PUT = createApiEndpoint("updateSiloBridge", async (_req, ctx) => {
  const siloId = Number(ctx.params.id)
  const bridge = await getSiloBridge(siloId)

  if (!bridge) {
    abort(404)
  }

  const { fromNetworks, toNetworks } = ctx.body

  const updatedBridge = await updateSiloBridge(siloId, {
    fromNetworks: fromNetworks ? getValidNetworks(fromNetworks) : undefined,
    toNetworks: toNetworks ? getValidNetworks(toNetworks) : undefined,
    tokens: ctx.body.tokens,
  })

  return getBridgeSchema(updatedBridge)
})
