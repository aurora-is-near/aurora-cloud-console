import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { Contract } from "../../../../../types/types"
import { abort } from "../../../../../utils/abort"
import { getDealById } from "@/utils/proxy-api/get-deal-by-id"
import { addContract } from "@/utils/proxy-api/add-contract"

export const POST = apiRequestHandler(
  ["deals:write"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const deal = await getDealById(ctx.user, Number(ctx.params.id))
    const { name, address } = await req.json()

    if (!deal) {
      abort(404)
    }

    const contract = await addContract(deal.id, name, address)

    return NextResponse.json<Contract>(contract)
  },
)
