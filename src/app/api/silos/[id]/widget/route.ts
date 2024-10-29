import { createApiEndpoint } from "@/utils/api"
import { getSilo } from "@/actions/silos/get-silo"
import { Silo, Token, Widget, WidgetNetworkType } from "@/types/types"
import { WidgetSchema } from "@/types/api-schemas"
import { isValidNetwork } from "@/utils/widget"
import { getTokens } from "@/actions/tokens/get-tokens"
import { getWidgetUrl } from "@/actions/widget/get-widget-url"
import { upsertWidget } from "@/actions/widget/upsert-widget"
import { getWidget } from "@/actions/widget/get-widget"
import { abort } from "../../../../../utils/abort"

const getValidNetworks = (networks: string[]): WidgetNetworkType[] => {
  const validNetworks = networks.filter(isValidNetwork)
  const invalidNetworks = networks.filter((network) => !isValidNetwork(network))

  if (invalidNetworks.length) {
    abort(400, `Invalid network(s): ${invalidNetworks.join(", ")}`)
  }

  return validNetworks
}

const getWidgetSchema = (data: {
  silo: Silo
  widget: Widget
  tokens: Token[]
}): WidgetSchema => {
  const { widget } = data ?? {}

  return {
    enabled: true,
    createdAt: widget.created_at,
    updatedAt: widget.updated_at,
    fromNetworks: widget.from_networks,
    toNetworks: widget.to_networks,
    tokens: widget.tokens,
    widgetUrl: getWidgetUrl(data),
  }
}

const getDisabledWidgetSchema = (): WidgetSchema => ({
  enabled: false,
  createdAt: null,
  updatedAt: null,
  fromNetworks: null,
  toNetworks: null,
  tokens: [],
  widgetUrl: null,
})

export const GET = createApiEndpoint("getWidget", async (_req, ctx) => {
  const [widget, silo, tokens] = await Promise.all([
    getWidget(Number(ctx.params.id)),
    getSilo(Number(ctx.params.id)),
    getTokens(),
  ])

  if (!silo) {
    abort(404)
  }

  if (!widget) {
    return getDisabledWidgetSchema()
  }

  return getWidgetSchema({ silo, widget, tokens })
})

export const PUT = createApiEndpoint("updateWidget", async (_req, ctx) => {
  const siloId = Number(ctx.params.id)
  const [silo, tokens] = await Promise.all([
    getSilo(Number(ctx.params.id)),
    getTokens(),
  ])

  if (!silo) {
    abort(404)
  }

  const { fromNetworks, toNetworks } = ctx.body

  const widget = await upsertWidget(siloId, {
    fromNetworks: fromNetworks ? getValidNetworks(fromNetworks) : undefined,
    toNetworks: toNetworks ? getValidNetworks(toNetworks) : undefined,
    tokens: ctx.body.tokens,
  })

  return getWidgetSchema({ widget, silo, tokens })
})
