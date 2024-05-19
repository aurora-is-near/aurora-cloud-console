import { createApiEndpoint } from "@/utils/api"
import { abort } from "../../../../../utils/abort"
import { getSilo } from "@/actions/silos/get-silo"
import { getSiloBridge } from "@/actions/silo-bridge/get-silo-bridge"
import { createSiloBridge } from "@/actions/silo-bridge/create-silo-bridge"
import { Bridge } from "@/types/types"
import { BridgeSchema } from "@/types/api-schemas"

const getBridgeSchema = (bridge?: Bridge): BridgeSchema => {
  if (!bridge) {
    return {
      enabled: false,
      createdAt: null,
      updatedAt: null,
    }
  }

  return {
    enabled: true,
    createdAt: bridge.created_at,
    updatedAt: bridge.updated_at,
  }
}

export const GET = createApiEndpoint("getSiloBridge", async (_req, ctx) => {
  const silo = await getSilo(Number(ctx.params.id))

  if (!silo) {
    abort(404)
  }

  const bridge = await getSiloBridge(silo.id)

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
