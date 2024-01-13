import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { prisma } from "../../../../utils/prisma"
import { User } from "@prisma/client"

export const PATCH = apiRequestHandler(
  ["admin"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const { name } = await req.json()

    await prisma.user.update({
      where: {
        id: ctx.user.id,
      },
      data: {
        name,
      },
    })

    return NextResponse.json({ status: "OK" })
  },
)

export const GET = apiRequestHandler(
  ["admin"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    return NextResponse.json<User>(ctx.user)
  },
)
