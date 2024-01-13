import { NextRequest, NextResponse } from "next/server"
import { apiRequestHandler } from "@/utils/api"
import { queryUsers } from "../../../../utils/proxy-db/query-users"
import { getSilos } from "../../../../mockApi"
import { UserDetailsQuery } from "../../../../types/types"

const HEADERS: (keyof UserDetailsQuery)[] = [
  "wallet_address",
  "transactions_count",
  "created_at",
  "last_transaction_at",
]

export const GET = apiRequestHandler(
  ["users:read"],
  async (req: NextRequest) => {
    const silos = await getSilos()
    const siloChainIds = silos.map((silo) => silo.chainId)
    const { searchParams } = req.nextUrl
    const dealId = searchParams.get("dealId")

    const result = await queryUsers(siloChainIds, {
      dealId,
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
