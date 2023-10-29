import { NextResponse } from "next/server"
import { getDeals } from "@/mockApi"
import { apiRequestHandler } from "@/utils/api"

export const GET = apiRequestHandler(['deals:read'], async () => {
  // TODO: Query the actual user's company's deals
  const deals = await getDeals()

  return NextResponse.json(deals)
})
