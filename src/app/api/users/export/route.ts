import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { queryUsers } from "../../../../utils/proxy-db/query-users"
import { UserDetailsQuery } from "../../../../types/types"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"
import { getDealKey } from "@/utils/proxy-api/get-deal-key"

const HEADERS: (keyof UserDetailsQuery)[] = [
  "wallet_address",
  "transactions_count",
  "created_at",
  "last_transaction_at",
]

export const GET = apiRequestHandler(
  ["users:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const silos = await getTeamSilos(ctx.team.team_key)

    const siloChainIds = silos.map((silo) => silo.chain_id)
    const { searchParams } = req.nextUrl
    const dealId = searchParams.get("dealId")
    const dealKey = dealId ? await getDealKey(Number(dealId)) : null

    const result = await queryUsers(ctx.team.is_demo_account, siloChainIds, {
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
