import { BridgeNetworkType } from "@/types/types"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { isValidNetwork } from "@/utils/bridge"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useMemo } from "react"

export type Network = {
  key: BridgeNetworkType
  label: string
  evm?: string
}

const AURORA_CHAIN_IDS = ["1313161554", "1313161555", "1313161556"]

const DEFAULT_NETWORKS: Network[] = [
  {
    key: "AURORA",
    label: "Aurora",
    evm: "aurora",
  },
  {
    key: "ETHEREUM",
    label: "Ethereum",
    evm: "ethereum",
  },
  {
    key: "NEAR",
    label: "Near",
    evm: "near",
  },
]

export const useBridgeNetworks = (siloId: number) => {
  const { data: silo, isPending: isSiloPending } = useQuery(
    getQueryFnAndKey("getSilo", {
      id: siloId,
    }),
  )

  const { data: siloBridge, isPending: isSiloBridgePending } = useQuery(
    getQueryFnAndKey("getSiloBridge", {
      id: siloId,
    }),
  )

  const availableNetworks = useMemo((): Network[] => {
    if (!silo || AURORA_CHAIN_IDS.includes(silo.chainId)) {
      return DEFAULT_NETWORKS
    }

    return [
      ...DEFAULT_NETWORKS,
      {
        key: "CUSTOM",
        label: "Your Chain",
        evm: silo.engineAccount,
      },
    ]
  }, [silo])

  const filterNetworks = useCallback(
    (networks: string[]) =>
      Object.values(networks)
        .filter(isValidNetwork)
        .map((network) => availableNetworks.find(({ key }) => key === network))
        .filter((network): network is Network => !!network),
    [availableNetworks],
  )

  return {
    isPending: isSiloPending || isSiloBridgePending,
    availableNetworks,
    toNetworks: filterNetworks(siloBridge?.toNetworks ?? []),
    fromNetworks: filterNetworks(siloBridge?.fromNetworks ?? []),
  }
}
