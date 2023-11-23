import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { deleteContract } from "@/utils/proxy-api/delete-contract"
import { NextRequest, NextResponse } from "next/server"

export const DELETE = apiRequestHandler(
  ["deals:write"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    await deleteContract(Number(ctx.params.id))

    return NextResponse.json({ status: "OK" })
  },
)
