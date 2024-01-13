import { NextRequest, NextResponse } from "next/server"
import { Contract } from "@/types/types"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { addContract } from "@/utils/proxy-api/add-contract"
import { deleteContract } from "@/utils/proxy-api/delete-contract"
import { getContract } from "@/utils/proxy-api/get-contract"

export const GET = apiRequestHandler(
  ["deals:read"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const contract = await getContract(
      Number(ctx.params.id),
      Number(ctx.params.contractId),
    )

    return NextResponse.json<Contract>(contract)
  },
)

export const DELETE = apiRequestHandler(
  ["deals:write"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    await deleteContract(Number(ctx.params.id), Number(ctx.params.contractId))

    return NextResponse.json({ status: "OK" })
  },
)

export const PUT = apiRequestHandler(
  ["deals:write"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const { name, address } = await req.json()

    // When we get to the real proxy API there is no concept of editing, so
    // we have to delete the old contract and add a new one.
    const [contract] = await Promise.all([
      addContract(Number(ctx.params.id), name, address),
      deleteContract(Number(ctx.params.id), Number(ctx.params.contractId)),
    ])

    return NextResponse.json<Contract>(contract)
  },
)
