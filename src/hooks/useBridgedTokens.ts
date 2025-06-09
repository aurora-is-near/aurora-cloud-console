import { useQuery } from "@tanstack/react-query"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { getBridgedTokens } from "@/actions/bridged-tokens/get-bridged-tokens"
import { BASE_TOKEN_PLACEHOLDER_ADDRESS } from "@/constants/base-token"

export const useBridgedTokens = (siloId: number) => {
  const { data: bridgedSiloTokens, isPending: isSiloTokensPending } = useQuery(
    getQueryFnAndKey("getSiloBridgedTokens", {
      id: siloId,
    }),
  )

  const {
    data: bridgedSiloTokenRequests,
    isPending: isSiloTokenRequestsPending,
  } = useQuery(
    getQueryFnAndKey("getSiloBridgedTokenRequests", {
      id: siloId,
    }),
  )

  const { data: supportedTokens = [], isPending: isSupportedTokensPending } =
    useQuery({
      queryKey: ["all-bridged-tokens"],
      queryFn: async () => {
        return getBridgedTokens()
      },
    })

  const bridgedSiloTokensSymbols =
    bridgedSiloTokens?.items.map((token) => token.symbol.toUpperCase()) ?? []

  // List the tokens that can be bridged and have not already been for the given
  // silo.
  const bridgeableTokens = supportedTokens.filter((token) => {
    const canBeAutomaticallyBridged = !!token.aurora_address
    const isBaseToken = token.silo_address === BASE_TOKEN_PLACEHOLDER_ADDRESS
    const isAlreadyBridged = bridgedSiloTokensSymbols.includes(
      token.symbol.toUpperCase(),
    )

    return (!!canBeAutomaticallyBridged || isBaseToken) && !isAlreadyBridged
  })

  return {
    isPending:
      isSiloTokensPending ||
      isSiloTokenRequestsPending ||
      isSupportedTokensPending,
    bridgeableTokens,
    bridgedSiloTokens: bridgedSiloTokens?.items ?? [],
    bridgedSiloTokenRequests: bridgedSiloTokenRequests?.items ?? [],
  }
}
