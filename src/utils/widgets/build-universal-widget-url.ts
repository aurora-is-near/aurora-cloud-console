import { NextRequest } from "next/server"
import { getSilo } from "@/actions/silos/get-silo"
import { getTokens } from "@/actions/tokens/get-tokens"
import { getWidget } from "@/actions/widget/get-widget"
import { getWidgetUrl } from "@/actions/widget/get-widget-url"

export const buildUniversalWidgetUrl = async (
  req: NextRequest,
): Promise<string | null> => {
  const siloId = Number(req.nextUrl.pathname.match(/\/silos\/(\d+)/)?.[1])

  if (Number.isNaN(siloId)) {
    return null
  }

  const [widget, silo, tokens] = await Promise.all([
    getWidget(siloId),
    getSilo(siloId),
    getTokens(),
  ])

  if (!silo || !widget) {
    return null
  }

  return getWidgetUrl({ silo, widget, tokens })
}
