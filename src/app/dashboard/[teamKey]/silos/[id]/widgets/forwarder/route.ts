import { NextRequest, NextResponse } from "next/server"
import { buildForwarderWidgetUrl } from "@/utils/widgets/build-forwarder-widget-url"

export async function GET(req: NextRequest) {
  const url = await buildForwarderWidgetUrl(req)

  if (!url) {
    return new NextResponse(null, { status: 404 })
  }

  return NextResponse.redirect(url)
}
