import {
  differenceInMonths,
  eachDayOfInterval,
  isAfter,
  parseISO,
} from "date-fns"

import { createApiEndpoint } from "@/utils/api"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { queryGasCollected } from "../../../../../utils/blockscout-db/query-gas-collected"
import { abort } from "../../../../../utils/abort"

const getDay = (date: Date | string) =>
  new Date(date).toISOString().split("T")[0]

export const GET = createApiEndpoint(
  "getSiloCollectedGas",
  async (req, ctx) => {
    const startDate = req.nextUrl.searchParams.get("startDate")
    const endDate = req.nextUrl.searchParams.get("endDate")
    const silo = await getTeamSilo(ctx.team.id, Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    if (!startDate || !endDate) {
      abort(400, "Missing date query parameter")
    }

    const start = parseISO(startDate)
    const end = parseISO(endDate)

    if (isAfter(start, end)) {
      abort(400, "End date must be later than start date")
    }

    if (differenceInMonths(end, start) > 3) {
      abort(400, "Requested period is too long (more than 3 months)")
    }

    const result = await queryGasCollected(silo.chain_id, {
      startDate,
      endDate,
    })

    const totalGasCollected = result[0].rows[0]?.count ?? 0
    const gasCollectedOverTimeByDay: Record<string, number> =
      result[1]?.rows.reduce(
        (acc, item) => ({
          ...acc,
          [getDay(item.day)]: item.count,
        }),
        {},
      )

    // Iterate over each day between start and end date, filling in the gas
    // collected if any data exists for a given day, or zero otherwise.
    const days = eachDayOfInterval({ start, end })
    const gasCollectedOverTime = days.map((dayDate) => {
      const day = getDay(dayDate)
      const gasCollected = gasCollectedOverTimeByDay[day]

      return {
        day,
        count: gasCollected || 0,
      }
    })

    return {
      count: totalGasCollected,
      items: gasCollectedOverTime,
    }
  },
  {
    cache: {
      maxAge: "1h",
      staleWhileRevalidate: "1y",
    },
  },
)
