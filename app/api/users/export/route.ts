import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { queryUsers } from "../../../../utils/proxy-db/query-users"
import { UserDetailsQuery } from "../../../../types/types"
import { getDealById } from "@/utils/proxy-api/get-deal-by-id"
import { getSilos } from "@/utils/proxy-api/get-silos"

const HEADERS: (keyof UserDetailsQuery)[] = [
  "wallet_address",
  "transactions_count",
  "created_at",
  "last_transaction_at",
]

export const GET = apiRequestHandler(
  ["users:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const silos = await getSilos(ctx.teamKey)
    const siloChainIds = silos.map((silo) => silo.chainId)
    const { searchParams } = req.nextUrl
    const dealId = searchParams.get("dealId")
    const dealKey = dealId
      ? (await getDealById(ctx.teamKey, Number(dealId)))?.key
      : null

    const result = await queryUsers(siloChainIds, {
      dealKey,
    })

    const csv = [
      HEADERS.join(","),
      ...result.rows.map((row) =>
        HEADERS.map((header) => row[header]).join(","),
      ),
    ].join("\n")

    return new NextResponse(csv, {
      headers: {
        "content-type": "application/csv",
        "content-disposition": `attachment; filename="users.csv"`,
        pragma: "no-cache",
      },
    })
  },
)
