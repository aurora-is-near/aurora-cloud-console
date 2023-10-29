import { NextRequest, NextResponse } from "next/server"
import { getUserLists } from "@/mockApi"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { abortIfUnauthorised } from "@/utils/abort"

export const GET = apiRequestHandler(async (
  _req: NextRequest,
  ctx: ApiRequestContext
) => {
  abortIfUnauthorised(ctx, ['users:read'])

  // TODO: Query the actual user's company's userlists
  const lists = await getUserLists()

  return NextResponse.json(lists)
})
