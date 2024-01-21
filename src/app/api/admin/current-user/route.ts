import { apiRequestHandler } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { NextRequest } from "next/server"

export const GET = apiRequestHandler(
  ["admin"],
  async (_req: NextRequest, ctx: ApiRequestContext) => ctx.user,
)
