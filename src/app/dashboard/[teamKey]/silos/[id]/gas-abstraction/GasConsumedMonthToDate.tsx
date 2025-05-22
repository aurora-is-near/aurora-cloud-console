"use client"

import { useQuery } from "@tanstack/react-query"
import { notReachable } from "@/utils/notReachable"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { getMonthsList } from "@/utils/dates/get-months-list"
import { getLastDayOfMonth } from "@/utils/dates/get-last-day-of-month"
import { Card, InfoList, Skeleton, Typography } from "@/uikit"
import type { Silo } from "@/types/types"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { Button } from "@/components/Button"
import {
  getEstimatedTransactionsLeft,
  useRelayerBalance,
} from "@/hooks/useRelayerBalance"

type Props = {
  silo: Silo
}

const Items = ({ silo }: Props) => {
  const monthsList = getMonthsList(silo.created_at)
  const startDate = monthsList[monthsList.length - 1].value
  const { openModal } = useModals()
  const { data: balanceData, isLoading } = useRelayerBalance(silo)

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
        <InfoList className="md:max-w-[50%]">
          <InfoList.Item
            label="Available balance"
            labelTooltip="Your current NEAR balance used to cover transaction fees on your chain."
          >
            <Skeleton />
          </InfoList.Item>
          <InfoList.Item
            label="Estimated transactions"
            labelTooltip="An approximate number of transactions your current NEAR balance can cover, based on average gas costs. Actual usage may vary depending on transaction complexity."
          >
            <Skeleton />
          </InfoList.Item>
          <InfoList.Item label="Total transactions used">
            <Skeleton />
          </InfoList.Item>
        </InfoList>
      )

    case "success": {
      const txLeft = getEstimatedTransactionsLeft(balanceData?.near)

      return (
        <InfoList className="md:max-w-[50%]">
          <InfoList.Item
            label="Available balance"
            labelTooltip="Your current NEAR balance used to cover transaction fees on your chain."
          >
            <div className="flex items-center justify-between gap-4 w-full">
              <Typography
                size={4}
                variant="paragraph"
                className="text-slate-900"
              >
                {isLoading ? <Skeleton /> : (balanceData?.near ?? 0)}
              </Typography>
              <div className="flex flex-col gap-2 item-end">
                <Button
                  className="flex-shrink-0"
                  onClick={() => openModal(Modals.TopUpOptions)}
                  variant="border"
                >
                  Top up
                </Button>
              </div>
            </div>
          </InfoList.Item>
          <InfoList.Item
            label="Estimated transactions"
            labelTooltip="An approximate number of transactions your current NEAR balance can cover, based on average gas costs. Actual usage may vary depending on transaction complexity."
          >
            <div className="flex items-center justify-end">
              <Typography
                size={4}
                variant="paragraph"
                className="text-slate-900"
              >
                {new Intl.NumberFormat(undefined).format(
                  txLeft < 0 ? 0 : txLeft,
                )}
              </Typography>
            </div>
          </InfoList.Item>
          <InfoList.Item label="Total transactions used">
            <div className="flex items-center justify-end">
              <Typography
                size={4}
                variant="paragraph"
                className="text-slate-900"
              >
                {new Intl.NumberFormat(undefined).format(
                  collectedGasQuery.data.transactionsCount,
                )}
              </Typography>
            </div>
          </InfoList.Item>
        </InfoList>
      )
    }
    default:
      return notReachable(collectedGasQuery)
  }
}

export const GasConsumedMonthToDate = ({ silo }: Props) => {
  return (
    <Card className="flex flex-col gap-6 md:gap-12 md:flex-row">
      <aside className="w-full">
        <Typography variant="heading" size={4} className="text-slate-900 mb-1">
          Transaction credits
        </Typography>
        <Typography variant="paragraph" size={4} className="text-slate-500">
          Overview of your transactions usage and balance up to date.
        </Typography>
      </aside>
      <Items silo={silo} />
    </Card>
  )
}
