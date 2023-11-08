import { NextResponse } from "next/server"
import { apiRequestHandler } from "@/utils/api"
import { query } from "../../../../utils/proxy-db"
import { UserDeals } from "../../../../types/types"
import { capitalCase } from "change-case"

export const GET = apiRequestHandler(["users:read"], async () => {
  const result = await query<{
    deal: string
  }>('SELECT DISTINCT "deal" FROM tx_traces')

  return NextResponse.json<UserDeals>({
    deals: result.rows.map((row) => ({
      id: row.deal,
      name: capitalCase(row.deal),
      slug: encodeURIComponent(row.deal),
    })),
  })
})
