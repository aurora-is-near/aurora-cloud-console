"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  startOfMonth,
  endOfMonth,
  isBefore,
  addDays,
  addMonths,
  parseISO,
  format,
} from "date-fns"

import { getQueryFnAndKey } from "@/utils/api/queries"
import { TabCard } from "@/components/TabCard/TabCard"
import { notReachable } from "@/utils/notReachable"
import {
  BarChart,
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

export const GasAbstractionCollectedTab = ({ silo }: Props) => {
  const monthsList = getMonthsList(silo.created_at)
  const [filterDate, setFilterDate] = useState<DropdownOption>(
    monthsList[monthsList.length - 1],
  )

  const query = useQuery(
    getQueryFnAndKey("getSiloCollectedGas", {
      id: silo.id,
      startDate: filterDate.value,
      endDate: getLastDayOfMonth(filterDate.value),
    }),
  )

  return (
    <TabCard>
      <div className="flex flex-col gap-2">
        <header className="flex justify-between items-center">
          <div className="flex flex-col gap-y-2">
            <Label tooltip="Gas is charged in the base token of your Virtual Chain, and you can adjust the gas fee value below.">
              Gas collected
            </Label>
            {(() => {
              switch (query.status) {
                case "error":
                case "pending":
                  return <Skeleton />
                case "success":
                  return (
                    <Typography variant="heading" size={6}>
                      {/* TODO: Replace AURORA with the token name */}
                      {query.data?.count.toLocaleString()} AURORA
                    </Typography>
                  )
                default:
                  return notReachable(query)
              }
            })()}
          </div>
          <Dropdown
            options={monthsList}
            selected={filterDate}
            onChange={setFilterDate}
          />
        </header>

        <section className="mt-4 h-[140px] w-full">
          {(() => {
            switch (query.status) {
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
                        onClick={() => query.refetch()}
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
                    data={query.data.items.map(({ day, count }) => ({
                      x: format(parseISO(day), "MMM d"),
                      y: count,
                    }))}
                  />
                )
              default:
                return notReachable(query)
            }
          })()}
        </section>
      </div>
    </TabCard>
  )
}
