import { NextRequest, NextResponse } from "next/server"
import { buildForwarderWidgetUrl } from "@/utils/widgets/build-forwarder-widget-url"

export async function GET(req: NextRequest) {
  const url = await buildForwarderWidgetUrl(req)

  if (!url) {
    return new NextResponse(null, { status: 404 })
  }

  const res = new NextResponse(
    `
    window.acc = window.acc || {};

    window.acc.forwarderWidget = {
      open: () => {
        window.open('${url}',"newwindow",\`width=600,height=1000,left=\${window.screen.width / 2 - 300},top=\${window.screen.height / 2 - 400}\`);
      }
    };`,
  )

  res.headers.append("content-type", "application/javascript")

  return res
}
