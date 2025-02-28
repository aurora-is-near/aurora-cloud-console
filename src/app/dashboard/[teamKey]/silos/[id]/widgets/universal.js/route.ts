import { NextRequest, NextResponse } from "next/server"
import { buildUniversalWidgetUrl } from "@/utils/widgets/build-universal-widget-url"

export async function GET(req: NextRequest) {
  const url = await buildUniversalWidgetUrl(req)

  if (!url) {
    return new NextResponse(null, { status: 404 })
  }

  const res = new NextResponse(
    `
    window.acc = window.acc || {};

    window.acc.universalWidget = {
      open: () => {
        window.open('${url}',"newwindow",\`width=600,height=800,left=\${window.screen.width / 2 - 300},top=\${window.screen.height / 2 - 400}\`);
      }
    };`,
  )

  res.headers.append("content-type", "application/javascript")

  return res
}
