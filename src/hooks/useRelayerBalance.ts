"use client"

import { useQuery } from "@tanstack/react-query"
import { getRelayerBalance } from "@/actions/silo-relayers/get-relayer-balance"
import type { Silo } from "@/types/types"
import { queryKeys } from "@/actions/query-keys"

const TRANSACTIONS_PER_NEAR = 100

export const useRelayerBalance = (silo: Silo) => {
  return useQuery({
    queryKey: queryKeys.getRelayerBalance(silo?.id),
    queryFn: async () => getRelayerBalance(silo),
    refetchIntervalInBackground: false,
    refetchInterval: 45000, // Refresh every 45 seconds
    staleTime: 60000,
    refetchOnWindowFocus: false,
  })
}

export const getEstimatedTransactionsLeft = (
  nearBalance: number | null | undefined | string,
): number => {
  if (!nearBalance) {
    return 0
  }

  const nearBalanceNum = Number(nearBalance)

  return Math.floor(nearBalanceNum * TRANSACTIONS_PER_NEAR)
}
