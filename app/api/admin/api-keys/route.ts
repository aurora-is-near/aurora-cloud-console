import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { prisma } from "../../../../utils/prisma"
import { ApiKey } from "@prisma/client"

export const GET = apiRequestHandler(
  ["admin"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const apiKey = await prisma.apiKey.findMany({
      where: {
        userId: ctx.user.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json<ApiKey[]>(apiKey)
  },
)

export const POST = apiRequestHandler(
  ["admin"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const body = await req.json()

    const apiKey = await prisma.apiKey.create({
      data: {
        note: body.note,
        scopes: body.scopes,
        userId: ctx.user.userId,
      },
    })

    return NextResponse.json(apiKey)
  },
)
