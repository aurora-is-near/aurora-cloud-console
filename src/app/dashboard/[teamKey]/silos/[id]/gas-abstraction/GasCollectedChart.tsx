"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  addDays,
  addMonths,
  endOfMonth,
  format,
  isBefore,
  parseISO,
  startOfMonth,
} from "date-fns"
import type { UseQueryResult } from "@tanstack/react-query"

import { getQueryFnAndKey } from "@/utils/api/queries"
import { notReachable } from "@/utils/notReachable"
import {
  BarChart,
  Card,
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
  baseTokenSymbol: string
}

const getMonthsList = (createdAt: string): DropdownOption[] => {
  const startDate = startOfMonth(parseISO(createdAt))
  const currentDate = endOfMonth(new Date())

  const months: DropdownOption[] = []
  let currentMonth = startDate

  while (
    isBefore(currentMonth, currentDate) ||
    currentMonth.getMonth() === currentDate.getMonth()
  ) {
    const monthName = format(currentMonth, "MMMM")
    const year = format(currentMonth, "yyyy")

    months.push({
      label: `${monthName} ${year}`,
      value: format(currentMonth, "yyyy-MM-dd"),
    })

    currentMonth = addMonths(currentMonth, 1)
  }

  return months
}

const getEmptyMonthData = (date: string) => {
  const startDate = startOfMonth(parseISO(date))
  const endDate = endOfMonth(startDate)

  const data = []
  let currentDate = startDate

  while (currentDate <= endDate) {
    const monthName = format(currentDate, "MMM")
    const day = format(currentDate, "dd")

    data.push({ x: `${monthName} ${day}`, y: 0 })
    currentDate = addDays(currentDate, 1)
  }

  return data
}

const getLastDayOfMonth = (dateString: string) => {
  const date = parseISO(dateString)
  const lastDay = endOfMonth(date)

  return format(lastDay, "yyyy-MM-dd")
}

const formatTotalCollectedGasValue = (value: number) => {
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8,
  }).format(value)
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
          {formatTotalCollectedGasValue(collectedGasQuery.data.count)}{" "}
          {baseTokenSymbol}
        </Typography>
      )
    default:
      return notReachable(collectedGasQuery)
  }
}

export const GasCollectedChart = ({ silo, baseTokenSymbol }: Props) => {
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
              baseTokenSymbol={baseTokenSymbol}
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
                    <BarChart
                      showZeroValues
                      data={getEmptyMonthData(filterDate.value)}
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
                    <BarChart
                      showZeroValues
                      data={getEmptyMonthData(filterDate.value)}
                    />
                  </div>
                )
              case "success":
                return (
                  <BarChart
                    showZeroValues
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
