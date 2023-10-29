import { NextRequest, NextResponse } from "next/server"
import confirmUser from "@/utils/confirmUser"
import { getDeals } from "@/mockApi"

export async function GET(request: NextRequest) {
  const id = await confirmUser()

  // TODO: Query the actual user's company's deals

  const deals = await getDeals()

  try {
    return NextResponse.json(deals)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong." },
      { status: error.status || 500 },
    )
  }
}
