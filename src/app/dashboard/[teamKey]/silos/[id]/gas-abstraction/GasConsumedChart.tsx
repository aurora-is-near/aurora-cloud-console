"use client"

import { useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { parseISO } from "date-fns"

import { notReachable } from "@/utils/notReachable"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { getMonthsList } from "@/utils/dates/get-months-list"
import { getLastDayOfMonth } from "@/utils/dates/get-last-day-of-month"
import {
  Card,
  Chart,
  Dropdown,
  Label,
  Loading,
  Skeleton,
  Typography,
} from "@/uikit"
import type { DropdownOption } from "@/uikit"
import type { Silo } from "@/types/types"

type Props = {
  silo: Silo
}

export const GasConsumedChart = ({ silo }: Props) => {
  const monthsList = getMonthsList(silo.created_at)
  const [filterDate, setFilterDate] = useState<DropdownOption>(
    monthsList[monthsList.length - 1],
  )

  const collectedGasQuery = useQuery(
    getQueryFnAndKey("getSiloCollectedGas", {
      id: silo.id,
      startDate: filterDate.value,
      endDate: getLastDayOfMonth(filterDate.value),
    }),
  )

  const chartData = useMemo(() => {
    if (collectedGasQuery.status !== "success") return []

    let cumulativeSum = 0
    return collectedGasQuery.data.items.map(({ day, transactionsCount }) => {
      cumulativeSum += transactionsCount
      return {
        x: parseISO(day),
        y: cumulativeSum,
      }
    })
  }, [collectedGasQuery.data, collectedGasQuery.status])

  return (
    <Card>
      <div className="flex flex-col gap-2">
        <header className="flex justify-between items-center">
          <div className="flex flex-col gap-y-2">
            <Label>Monthly transactions</Label>
            {collectedGasQuery.status !== "success" ? (
              <Skeleton />
            ) : (
              <Typography variant="heading" size={6}>
                {`${new Intl.NumberFormat(undefined).format(
                  collectedGasQuery.data.transactionsCount,
                )} / `}
                <span className="text-slate-500">Unlimited</span>
              </Typography>
            )}
          </div>
          <Dropdown
            options={monthsList}
            selected={filterDate}
            onChange={setFilterDate}
          />
        </header>

        <section className="mt-4 h-[140px] w-full">
          {(() => {
            switch (collectedGasQuery.status) {
              case "pending":
                return (
                  <div className="w-full relative">
                    <Loading className="absolute top-1/3 left-1/2 -ml-10" />
                    <Chart.LineDates data={[]} plugins={["minimizeLabels"]} />
                  </div>
                )
              case "error":
                return (
                  <div className="w-full relative">
                    <Typography
                      variant="label"
                      size={3}
                      className="absolute top-1/3 left-1/2 -ml-10 text-slate-500"
                    >
                      Couldn't load.
                      <button
                        type="button"
                        className="text-cyan-600 ml-1 cursor-pointer"
                        onClick={() => collectedGasQuery.refetch()}
                      >
                        Try again
                      </button>
                    </Typography>
                    <Chart.LineDates data={[]} plugins={["minimizeLabels"]} />
                  </div>
                )
              case "success":
                return (
                  <Chart.LineDates
                    data={chartData}
                    plugins={["showTodayLine", "minimizeLabels"]}
                  />
                )
              default:
                return notReachable(collectedGasQuery)
            }
          })()}
        </section>
      </div>
    </Card>
  )
}
