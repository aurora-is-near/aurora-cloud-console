import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { prisma } from "../../../../../utils/prisma"

export const GET = apiRequestHandler(
  ["admin"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const apiKeyId = ctx.params.id

    const apiKey = await prisma.apiKey.findUnique({
      where: {
        id: Number(apiKeyId),
        userId: ctx.user.userId,
      },
    })

    return NextResponse.json(apiKey)
  },
)

export const PUT = apiRequestHandler(
  ["admin"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const apiKeyId = ctx.params.id
    const body = await req.json()

    const apiKey = await prisma.apiKey.update({
      where: {
        id: Number(apiKeyId),
        userId: ctx.user.userId,
      },
      data: {
        note: body.note,
        scopes: body.scopes,
      },
    })

    return NextResponse.json(apiKey)
  },
)

export const DELETE = apiRequestHandler(
  ["admin"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const apiKeyId = ctx.params.id

    await prisma.apiKey.delete({
      where: {
        id: Number(apiKeyId),
        userId: ctx.user.userId,
      },
    })

    return NextResponse.json({ status: "OK" })
  },
)
