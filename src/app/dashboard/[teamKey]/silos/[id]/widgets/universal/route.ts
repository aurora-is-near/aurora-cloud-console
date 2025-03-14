import { NextRequest, NextResponse } from "next/server"
import { buildUniversalWidgetUrl } from "@/utils/widgets/build-universal-widget-url"

export async function GET(req: NextRequest) {
  const url = await buildUniversalWidgetUrl(req)

  if (!url) {
    return new NextResponse(null, { status: 404 })
  }

  return NextResponse.redirect(url)
}
