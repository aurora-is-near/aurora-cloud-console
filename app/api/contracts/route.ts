import { Contract } from "@/types/types"
import { apiRequestHandler } from "@/utils/api"
import { addContract } from "@/utils/proxy-api/add-contract"

import { NextRequest, NextResponse } from "next/server"

export const POST = apiRequestHandler(
  ["deals:write"],
  async (req: NextRequest) => {
    const { deal_id, name, address } = await req.json()

    const contract = await addContract(deal_id, name, address)

    return NextResponse.json<Contract>(contract)
  },
)
