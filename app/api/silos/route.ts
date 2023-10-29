import { NextRequest, NextResponse } from "next/server"
import { getSilos } from "@/mockApi"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { abortIfUnauthorised } from "@/utils/abort"

export const GET = apiRequestHandler(async (
  _req: NextRequest,
  ctx: ApiRequestContext
) => {
  abortIfUnauthorised(ctx, ['silos:read'])

  // TODO: Query the actual user's company's silos
  const silos = await getSilos()

  return NextResponse.json(silos)
})
