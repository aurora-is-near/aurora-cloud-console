import { NextResponse } from "next/server"
import { getSilos } from "@/mockApi"
import { apiRequestHandler } from "@/utils/api"

export const GET = apiRequestHandler(async () => {
  // TODO: Query the actual user's company's silos
  const silos = await getSilos()

  try {
    return NextResponse.json(silos)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong." },
      { status: error.status || 500 }
    )
  }
})
