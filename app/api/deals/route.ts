import { NextResponse } from "next/server"
import { apiRequestHandler } from "@/utils/api"
import { Deals } from "../../../types/types"
import { getDeals } from "../../../mockApi"

export const GET = apiRequestHandler(["deals:read"], async () => {
  const deals = await getDeals()

  return NextResponse.json<Deals>({
    deals,
  })
})
