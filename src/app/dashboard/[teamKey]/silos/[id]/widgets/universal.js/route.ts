import { NextRequest, NextResponse } from "next/server"
import { getWidget } from "@/actions/widget/get-widget"
import { getWidgetUrl } from "@/actions/widget/get-widget-url"
import { getSilo } from "@/actions/silos/get-silo"
import { getTokens } from "@/actions/tokens/get-tokens"

export async function GET(req: NextRequest) {
  const siloId = Number(req.nextUrl.pathname.match(/\/silos\/(\d+)/)?.[1])

  if (Number.isNaN(siloId)) {
    return new NextResponse(null, { status: 404 })
  }

  const [widget, silo, tokens] = await Promise.all([
    getWidget(siloId),
    getSilo(siloId),
    getTokens(),
  ])

  if (!silo || !widget) {
    return new NextResponse(null, { status: 404 })
  }

  const res = new NextResponse(
    `
    window.acc = window.acc || {};

    window.acc.universalWidget = {
      open: () => {
        window.open('${getWidgetUrl({ silo, widget, tokens })}',"newwindow",\`width=600,height=800,left=\${window.screen.width / 2 - 300},top=\${window.screen.height / 2 - 400}\`);
      }
    };`,
  )

  res.headers.append("content-type", "application/javascript")

  return res
}
