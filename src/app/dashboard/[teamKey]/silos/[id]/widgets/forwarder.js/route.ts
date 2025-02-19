import { NextRequest, NextResponse } from "next/server"
import { getSilo } from "@/actions/silos/get-silo"
import { getForwarderWidgetUrl } from "@/utils/forwarder"

export async function GET(req: NextRequest) {
  const siloId = Number(req.nextUrl.pathname.match(/\/silos\/(\d+)/)?.[1])

  if (Number.isNaN(siloId)) {
    return new NextResponse(null, { status: 404 })
  }

  const silo = await getSilo(siloId)

  if (!silo) {
    return new NextResponse(null, { status: 404 })
  }

  const res = new NextResponse(
    `
    window.acc = window.acc || {};

    window.acc.forwarderWidget = {
      open: () => {
        window.open('${getForwarderWidgetUrl(silo)}',"newwindow",\`width=600,height=1000,left=\${window.screen.width / 2 - 300},top=\${window.screen.height / 2 - 400}\`);
      }
    };`,
  )

  res.headers.append("content-type", "application/javascript")

  return res
}
