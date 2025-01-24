"use client"

import { useQuery } from "@tanstack/react-query"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"

import { useStripePaymentLink } from "@/hooks/useStripePaymentLink"
import { LinkButton } from "@/components/LinkButton"
import { notReachable } from "@/utils/notReachable"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { getMonthsList } from "@/utils/dates/get-months-list"
import { getLastDayOfMonth } from "@/utils/dates/get-last-day-of-month"
import { Card, InfoList, Skeleton, Typography } from "@/uikit"
import type { Silo, Team } from "@/types/types"

type Props = {
  team: Team
  silo: Silo
}

const Items = ({ silo, team }: Props) => {
  const topupLink = useStripePaymentLink(team)
  const monthsList = getMonthsList(silo.created_at)
  const startDate = monthsList[monthsList.length - 1].value
  const infoListItemProps = {
    label: "Total transactions used",
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
        <InfoList className="md:max-w-[50%]">
          <InfoList.Item label="Available transactions">
            <Skeleton />
          </InfoList.Item>
          <InfoList.Item {...infoListItemProps}>
            <Skeleton />
          </InfoList.Item>
        </InfoList>
      )
    case "success":
      // TODO: this is a temporary solution, we need to get the actual value
      const transactionLeft = 1000 - collectedGasQuery.data.transactionsCount
      return (
        <InfoList className="md:max-w-[50%]">
          <InfoList.Item label="Available transactions">
            <div className="flex items-center justify-end gap-4">
              <Typography
                size={4}
                variant="paragraph"
                className="text-slate-900"
              >
                {new Intl.NumberFormat(undefined).format(
                  transactionLeft < 0 ? 0 : transactionLeft,
                )}
              </Typography>
              <LinkButton
                size="sm"
                variant="border"
                href={topupLink ?? ""}
                isExternal
              >
                Top up
                <ArrowTopRightOnSquareIcon className="w-3 h-3" />
              </LinkButton>
            </div>
          </InfoList.Item>
          <InfoList.Item {...infoListItemProps}>
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
    default:
      return notReachable(collectedGasQuery)
  }
}

export const GasConsumedMonthToDate = ({ silo, team }: Props) => {
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
      <Items silo={silo} team={team} />
    </Card>
  )
}
