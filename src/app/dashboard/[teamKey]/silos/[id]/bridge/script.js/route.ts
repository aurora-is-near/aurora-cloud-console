import { NextRequest, NextResponse } from "next/server"
import { getSiloBridge } from "@/actions/silo-bridge/get-silo-bridge"
import { getWidgetUrl } from "@/actions/silo-bridge/get-widget-url"
import { getSilo } from "@/actions/silos/get-silo"
import { getTokens } from "@/actions/tokens/get-tokens"

// IMPORTANT
// This was kept here for backwards compatibility

export async function GET(req: NextRequest) {
  const siloId = Number(req.nextUrl.pathname.match(/\/silos\/(\d+)/)?.[1])

  if (Number.isNaN(siloId)) {
    return new NextResponse(null, { status: 404 })
  }

  const [bridge, silo, tokens] = await Promise.all([
    getSiloBridge(siloId),
    getSilo(siloId),
    getTokens(),
  ])

  if (!silo || !bridge) {
    return new NextResponse(null, { status: 404 })
  }

  const widgetUrl = getWidgetUrl({ silo, bridge, tokens })
  const res = new NextResponse(
    `window.accBridge = { open: () => { window.open('${widgetUrl}',"newwindow",\`width=600,height=800,left=\${window.screen.width / 2 - 300},top=\${window.screen.height / 2 - 400}\`); } };`,
  )

  res.headers.append("content-type", "application/javascript")

  return res
}
