"use client"

import { useQuery } from "@tanstack/react-query"

import { Skeleton } from "@/uikit"
import { notReachable } from "@/utils/notReachable"
import { getQueryFnAndKey } from "@/utils/api/queries"
import type { Silo } from "@/types/types"

import { GasCollectedChart } from "./GasCollectedChart"
import { GasAbstractionSettings } from "./GasAbstractionSettings"
import { GasAbstractionMechanics } from "./GasAbstractionMechanics"

type Props = {
  silo: Silo
}

const TabSkeleton = () => (
  <div className="w-full flex flex-col gap-5">
    <Skeleton className="rounded-sm h-[266px]" />
    <Skeleton className="rounded-sm h-[250px] md:h-[200px]" />
    <Skeleton className="rounded-sm h-[250px] md:h-[156px]" />
  </div>
)

export const GasAbstractionCollectedTab = ({ silo }: Props) => {
  const siloTokensQuery = useQuery(
    getQueryFnAndKey("getSiloTokens", { id: silo.id }),
  )

  switch (siloTokensQuery.status) {
    case "error":
    case "pending":
      return <TabSkeleton />

    case "success": {
      const baseToken = siloTokensQuery.data.items.find(
        (token) => token.id === silo.base_token_id,
      )

      if (!baseToken) {
        return <TabSkeleton />
      }

      return (
        <section className="w-full space-y-5">
          <GasCollectedChart silo={silo} baseTokenSymbol={baseToken.symbol} />
          <GasAbstractionSettings
            silo={silo}
            baseTokenSymbol={baseToken.symbol}
          />
          <GasAbstractionMechanics
            silo={silo}
            baseTokenSymbol={baseToken.symbol}
          />
        </section>
      )
    }

    default:
      return notReachable(siloTokensQuery)
  }
}
