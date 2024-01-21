import { User } from "@/types/types"
import { apiRequestHandler } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { NextRequest, NextResponse } from "next/server"

export const GET = apiRequestHandler(
  ["admin"],
  async (_req: NextRequest, ctx: ApiRequestContext) =>
    NextResponse.json<User>(ctx.user),
)
