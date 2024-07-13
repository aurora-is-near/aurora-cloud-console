import { createApiEndpoint } from "@/utils/api"
import { getSilo } from "@/actions/silos/get-silo"
import { getSiloBridge } from "@/actions/silo-bridge/get-silo-bridge"
import { createSiloBridge } from "@/actions/silo-bridge/create-silo-bridge"
import { Bridge, BridgeNetworkType, Silo, Token } from "@/types/types"
import { BridgeSchema } from "@/types/api-schemas"
import { updateSiloBridge } from "@/actions/silo-bridge/update-silo-bridge"
import { isValidNetwork } from "@/utils/bridge"
import { getTokens } from "@/actions/tokens/get-tokens"
import { getWidgetUrl } from "@/actions/silo-bridge/get-widget-url"
import { abort } from "../../../../../utils/abort"

const getValidNetworks = (networks: string[]): BridgeNetworkType[] => {
  const validNetworks = networks.filter(isValidNetwork)
  const invalidNetworks = networks.filter((network) => !isValidNetwork(network))

  if (invalidNetworks.length) {
    abort(400, `Invalid network(s): ${invalidNetworks.join(", ")}`)
  }

  return validNetworks
}

const getBridgeSchema = (data: {
  silo: Silo
  bridge: Bridge
  tokens: Token[]
}): BridgeSchema => {
  const { bridge } = data ?? {}

  return {
    enabled: true,
    createdAt: bridge.created_at,
    updatedAt: bridge.updated_at,
    fromNetworks: bridge.from_networks,
    toNetworks: bridge.to_networks,
    tokens: bridge.tokens,
    widgetUrl: getWidgetUrl(data),
  }
}

const getDisabledBridgeSchema = (): BridgeSchema => ({
  enabled: false,
  createdAt: null,
  updatedAt: null,
  fromNetworks: null,
  toNetworks: null,
  tokens: [],
  widgetUrl: null,
})

export const GET = createApiEndpoint("getSiloBridge", async (_req, ctx) => {
  const [bridge, silo, tokens] = await Promise.all([
    getSiloBridge(Number(ctx.params.id)),
    getSilo(Number(ctx.params.id)),
    getTokens(),
  ])

  if (!silo) {
    abort(404)
  }

  if (!bridge) {
    return getDisabledBridgeSchema()
  }

  return getBridgeSchema({ silo, bridge, tokens })
})

export const POST = createApiEndpoint("createSiloBridge", async (_req, ctx) => {
  const [silo, tokens] = await Promise.all([
    getSilo(Number(ctx.params.id)),
    getTokens(),
  ])

  if (!silo) {
    abort(404)
  }

  const existingBridge = await getSiloBridge(silo.id)

  if (existingBridge) {
    abort(400, "Bridge already exists")
  }

  const bridge = await createSiloBridge({ silo_id: silo.id })

  return getBridgeSchema({ bridge, silo, tokens })
})

export const PUT = createApiEndpoint("updateSiloBridge", async (_req, ctx) => {
  const siloId = Number(ctx.params.id)
  const [bridge, silo, tokens] = await Promise.all([
    getSiloBridge(siloId),
    getSilo(Number(ctx.params.id)),
    getTokens(),
  ])

  if (!silo || !bridge) {
    abort(404)
  }

  const { fromNetworks, toNetworks } = ctx.body

  const updatedBridge = await updateSiloBridge(siloId, {
    fromNetworks: fromNetworks ? getValidNetworks(fromNetworks) : undefined,
    toNetworks: toNetworks ? getValidNetworks(toNetworks) : undefined,
    tokens: ctx.body.tokens,
  })

  return getBridgeSchema({ bridge: updatedBridge, silo, tokens })
})
