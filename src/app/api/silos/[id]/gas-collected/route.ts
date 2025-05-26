import {
  differenceInMonths,
  eachDayOfInterval,
  isAfter,
  parseISO,
} from "date-fns"

import { logger } from "@/logger"
import { createApiEndpoint } from "@/utils/api"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { getSiloBlockscoutDatabase } from "@/actions/silo-blockscout-database/get-silo-blockscout-database"

import { abort } from "../../../../../utils/abort"
import { queryGasCollected } from "../../../../../utils/blockscout-db/query-gas-collected"

const getDay = (date: Date | string) =>
  new Date(date).toISOString().split("T")[0]

export const GET = createApiEndpoint(
  "getSiloCollectedGas",
  async (req, ctx) => {
    const startDate = req.nextUrl.searchParams.get("startDate")
    const endDate = req.nextUrl.searchParams.get("endDate")
    const siloId = Number(ctx.params.id)
    const [silo, blockscoutDatabase] = await Promise.all([
      getTeamSilo(ctx.team.id, siloId),
      getSiloBlockscoutDatabase(siloId),
    ])

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

    if (!blockscoutDatabase) {
      logger.warn(
        `Cannot query gas collected as no blockscout database found for silo ${siloId}`,
      )

      return {
        count: 0,
        transactionsCount: 0,
        items: [],
      }
    }

    const result = await queryGasCollected(blockscoutDatabase, {
      startDate,
      endDate,
    })

    const totalGasCollected = parseFloat(result[0].rows[0]?.count ?? "0")
    const transactionsCount = parseInt(
      result[0].rows[0]?.transactions_count ?? "0",
      10,
    )

    const gasCollectedOverTimeByDay: Record<
      string,
      { gas: number; transactions: number }
    > = result[1]?.rows.reduce(
      (acc, item) => ({
        ...acc,
        [getDay(item.day)]: {
          gas: parseFloat(item.count ?? "0"),
          transactions: parseInt(item.transactions_count ?? "0", 10),
        },
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
        count: gasCollected?.gas || 0,
        transactionsCount: gasCollected?.transactions || 0,
      }
    })

    return {
      transactionsCount,
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
