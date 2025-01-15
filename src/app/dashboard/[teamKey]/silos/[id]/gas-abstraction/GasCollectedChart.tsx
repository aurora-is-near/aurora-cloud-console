"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { format, parseISO } from "date-fns"
import type { UseQueryResult } from "@tanstack/react-query"

import { notReachable } from "@/utils/notReachable"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { formatGasValue } from "@/utils/format-gas-value"
import { getMonthsList } from "@/utils/dates/get-months-list"
import { getEmptyMonthData } from "@/utils/dates/get-empty-month-data"
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

const GasCollectedTotal = ({
  baseTokenSymbol,
  collectedGasQuery,
}: {
  baseTokenSymbol: string
  collectedGasQuery: UseQueryResult<{
    count: number
    items: Array<{ day: string; count: number }>
  }>
}) => {
  switch (collectedGasQuery.status) {
    case "error":
    case "pending":
      return <Skeleton />
    case "success":
      return (
        <Typography variant="heading" size={6}>
          {formatGasValue(collectedGasQuery.data.count)} {baseTokenSymbol}
        </Typography>
      )
    default:
      return notReachable(collectedGasQuery)
  }
}

export const GasCollectedChart = ({ silo }: Props) => {
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

  return (
    <Card>
      <div className="flex flex-col gap-2">
        <header className="flex justify-between items-center">
          <div className="flex flex-col gap-y-2">
            <Label tooltip="Gas is charged in the base token of your Virtual Chain, and you can adjust the gas fee value below.">
              Gas collected
            </Label>
            <GasCollectedTotal
              baseTokenSymbol={silo.base_token_symbol}
              collectedGasQuery={collectedGasQuery}
            />
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
                    <Chart.Bar
                      plugins={["minimizeLabels"]}
                      data={getEmptyMonthData(filterDate.value, "MMM dd")}
                    />
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
                    <Chart.Bar
                      plugins={["minimizeLabels"]}
                      data={getEmptyMonthData(filterDate.value, "MMM dd")}
                    />
                  </div>
                )
              case "success":
                return (
                  <Chart.Bar
                    plugins={["minimizeLabels"]}
                    data={collectedGasQuery.data.items.map(
                      ({ day, count }) => ({
                        x: format(parseISO(day), "MMM d"),
                        y: count,
                      }),
                    )}
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
