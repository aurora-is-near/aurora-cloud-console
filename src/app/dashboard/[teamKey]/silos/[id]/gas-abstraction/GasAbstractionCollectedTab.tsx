"use client"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { getQueryFnAndKey } from "@/utils/api/queries"
import { TabCard } from "@/components/TabCard/TabCard"
import { notReachable } from "@/utils/notReachable"
import { Typography, Label, Dropdown, BarChart } from "@/uikit"
import type { DropdownOption } from "@/uikit"
import type { Silo } from "@/types/types"

type Props = {
  silo: Silo
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

const getMonthsList = (createdAt: string) => {
  const startDate = new Date(createdAt)
  const currentDate = new Date()

  currentDate.setMonth(currentDate.getMonth() + 1)
  currentDate.setDate(0)

  const months: DropdownOption[] = []
  const currentMonth = new Date(startDate)

  while (currentMonth <= currentDate) {
    const monthName = currentMonth.toLocaleString("default", { month: "long" })
    const year = currentMonth.getFullYear()
    months.push({
      label: `${monthName} ${year}`,
      value: currentMonth.toISOString(),
    })
    currentMonth.setMonth(currentMonth.getMonth() + 1)
  }

  return months
}

const getEmptyMonthData = (date: string) => {
  const startDate = new Date(date)
  const endDate = new Date(date)
  endDate.setMonth(startDate.getMonth() + 1)
  endDate.setDate(0)

  const data = []
  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const monthName = date.toLocaleString("default", { month: "short" })
    const day = String(date.getDate()).padStart(2, "0")
    data.push({ x: `${monthName} ${day}`, y: 0 })
  }

  return data
}

export const GasAbstractionCollectedTab = ({ silo }: Props) => {
  const monthsList = getMonthsList(silo.created_at)
  const [filterDate, setFilterDate] = useState<DropdownOption>(
    monthsList[monthsList.length - 1],
  )

  const query = useQuery(
    getQueryFnAndKey("getSiloCollectedGas", {
      id: silo.id,
      date: filterDate.value,
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
            <Typography variant="heading" size={6}>
              {query.data?.count.toLocaleString()} AURORA
            </Typography>
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
                  <BarChart
                    showZeroValues
                    data={getEmptyMonthData(filterDate.value)}
                  />
                )
              case "error":
                return "Error..."
              case "success":
                return (
                  <BarChart
                    showZeroValues
                    data={query.data.items.map(({ day, count }) => ({
                      x: formatDate(day),
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
