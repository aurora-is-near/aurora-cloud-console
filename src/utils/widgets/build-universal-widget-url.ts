import { NextRequest } from "next/server"
import { getSilo } from "@/actions/silos/get-silo"
import { getWidget } from "@/actions/widget/get-widget"
import { getWidgetUrl } from "@/actions/widget/get-widget-url"
import { getSiloBridgedTokens } from "@/actions/silo-bridged-tokens/get-silo-bridged-tokens"

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
    getSiloBridgedTokens(siloId),
  ])

  if (!silo || !widget) {
    return null
  }

  return getWidgetUrl({ silo, widget, tokens })
}
