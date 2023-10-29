import { NextResponse } from "next/server"
import { getSilos } from "@/mockApi"
import { apiRequestHandler } from "@/utils/api"

export const GET = apiRequestHandler(['silos:read'], async () => {
  // TODO: Query the actual user's company's silos
  const silos = await getSilos()

  return NextResponse.json(silos)
})
