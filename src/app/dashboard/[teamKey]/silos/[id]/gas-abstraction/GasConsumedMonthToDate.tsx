"use client"

import { useQuery } from "@tanstack/react-query"

import { notReachable } from "@/utils/notReachable"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { getMonthsList } from "@/utils/dates/get-months-list"
import { getLastDayOfMonth } from "@/utils/dates/get-last-day-of-month"
import { Card, InfoList, Skeleton, Typography } from "@/uikit"
import type { Silo } from "@/types/types"

type Props = {
  silo: Silo
}

const InfoListItemConsumedTransactions = ({ silo }: Props) => {
  const monthsList = getMonthsList(silo.created_at)
  const startDate = monthsList[monthsList.length - 1].value
  const infoListItemProps = {
    label: "Transactions consumed",
    labelTooltip:
      "The number of transactions on your chain for the current period.",
  }

  const collectedGasQuery = useQuery(
    getQueryFnAndKey("getSiloCollectedGas", {
      id: silo.id,
      startDate,
      endDate: getLastDayOfMonth(startDate),
    }),
  )

  switch (collectedGasQuery.status) {
    case "pending":
    case "error":
      return (
        <InfoList.Item {...infoListItemProps}>
          <Skeleton />
        </InfoList.Item>
      )
    case "success":
      return (
        <InfoList.Item {...infoListItemProps}>
          {new Intl.NumberFormat(undefined).format(
            collectedGasQuery.data.transactionsCount,
          )}
        </InfoList.Item>
      )
    default:
      return notReachable(collectedGasQuery)
  }
}

export const GasConsumedMonthToDate = ({ silo }: Props) => (
  <Card className="flex flex-col gap-6 md:gap-12 md:flex-row">
    <aside className="w-full">
      <Typography variant="heading" size={4} className="text-slate-900 mb-1">
        Month to date
      </Typography>
      <Typography variant="paragraph" size={4} className="text-slate-500">
        Overview of your monthly usage and charges based on your plan, including
        transactions, gas consumption, and total costs.
      </Typography>
    </aside>

    <InfoList className="md:max-w-[50%]">
      <InfoList.Item
        label="Included in plan"
        labelTooltip="Your monthly allocation of transactions that won't be charged to you."
      >
        Unlimited
      </InfoList.Item>
      <InfoListItemConsumedTransactions silo={silo} />
    </InfoList>
  </Card>
)
