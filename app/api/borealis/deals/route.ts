import { NextResponse } from "next/server"
import { getDeals } from "@/mockApi"
import { apiRequestHandler } from "@/utils/api"

export const GET = apiRequestHandler(async () => {
  // TODO: Query the actual user's company's deals
  const deals = await getDeals()

  try {
    return NextResponse.json(deals)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong." },
      { status: error.status || 500 }
    )
  }
})
