import { NextRequest, NextResponse } from "next/server"
import { Contract } from "@/types/types"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { addContract } from "@/utils/proxy-api/add-contract"
import { getContracts } from "@/utils/proxy-api/get-contracts"

export const GET = apiRequestHandler(
  ["deals:read"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const contracts = await getContracts(Number(ctx.params.id))

    return NextResponse.json<Contract[]>(contracts)
  },
)

export const POST = apiRequestHandler(
  ["deals:write"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const { name, address } = await req.json()

    const contract = await addContract(Number(ctx.params.id), name, address)

    return NextResponse.json<Contract>(contract)
  },
)
