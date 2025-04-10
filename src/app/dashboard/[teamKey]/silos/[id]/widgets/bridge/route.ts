import { NextRequest, NextResponse } from "next/server"
import { buildBridgeWidgetUrl } from "@/utils/widgets/build-bridge-widget-url"

export async function GET(req: NextRequest) {
  const url = await buildBridgeWidgetUrl(req)

  if (!url) {
    return new NextResponse(null, { status: 404 })
  }

  return NextResponse.redirect(url)
}
