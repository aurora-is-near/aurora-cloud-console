import { NextResponse } from "next/server"
import { getSilos } from "@/mockApi"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { abortIfUnauthorised } from "@/utils/abort"
import { NextApiRequest, NextApiResponse } from "next"

export const GET = apiRequestHandler(async (
  _req: NextApiRequest,
  _res: NextApiResponse,
  ctx: ApiRequestContext
) => {
  abortIfUnauthorised(ctx)

  // TODO: Query the actual user's company's silos
  const silos = await getSilos()

  return NextResponse.json(silos)
})
