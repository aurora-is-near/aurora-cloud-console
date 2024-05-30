import { TokenSchema } from "@/types/api-schemas"
import { DeploymentStatus } from "@/types/types"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { useQuery } from "@tanstack/react-query"

const filterTokens = (status: DeploymentStatus, tokens: TokenSchema[] = []) =>
  tokens.filter((token) => token.bridgeDeploymentStatus === status)

export const useBridgeTokens = (siloId: number) => {
  const { data: tokens, isPending: isSiloTokensPending } = useQuery(
    getQueryFnAndKey("getSiloTokens", {
      id: siloId,
    }),
  )

  const { data: siloBridge, isPending: isSiloBridgePending } = useQuery(
    getQueryFnAndKey("getSiloBridge", {
      id: siloId,
    }),
  )

  const undeployedTokens = filterTokens("NOT_DEPLOYED", tokens?.items)
  const pendingTokens = filterTokens("PENDING", tokens?.items)
  const deployedTokens = filterTokens("DEPLOYED", tokens?.items)
  const activeTokens =
    tokens?.items.filter((token) => siloBridge?.tokens.includes(token.id)) ?? []

  return {
    isPending: isSiloTokensPending || isSiloBridgePending,
    allTokens: tokens?.items ?? [],
    activeTokens,
    pendingTokens,
    deployedTokens,
    undeployedTokens,
  }
}
