import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { queryUsers } from "../../../../utils/proxy-db/query-users"
import { UserDetailsQuery } from "../../../../types/types"
import { getDealById } from "@/utils/proxy-api/get-deal-by-id"
import { getSilos } from "@/actions/admin/silos/get-silos"
import { getTeam } from "@/utils/team"
import { abort } from "@/utils/abort"

const HEADERS: (keyof UserDetailsQuery)[] = [
  "wallet_address",
  "transactions_count",
  "created_at",
  "last_transaction_at",
]

export const GET = apiRequestHandler(
  ["users:read"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    if (!ctx.teamKey) {
      abort(500, "No team key found")
    }

    const [team, silos] = await Promise.all([
      getTeam(ctx.teamKey),
      getSilos(ctx.teamKey),
    ])

    const siloChainIds = silos.map((silo) => silo.chain_id)
    const { searchParams } = req.nextUrl
    const dealId = searchParams.get("dealId")
    const dealKey = dealId
      ? (await getDealById(ctx.teamKey, Number(dealId)))?.key
      : null

    const result = await queryUsers(team.transaction_database, siloChainIds, {
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
