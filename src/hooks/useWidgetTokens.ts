import { useQuery } from "@tanstack/react-query"
import { TokenSchema } from "@/types/api-schemas"
import { DeploymentStatus } from "@/types/types"
import { getQueryFnAndKey } from "@/utils/api/queries"

const filterTokens = (status: DeploymentStatus, tokens: TokenSchema[] = []) =>
  tokens.filter((token) => token.bridge?.deploymentStatus === status)

export const useWidgetTokens = (siloId: number) => {
  const { data: tokens, isPending: isSiloTokensPending } = useQuery(
    getQueryFnAndKey("getSiloTokens", {
      id: siloId,
    }),
  )

  const { data: widget, isPending: isWidgetPending } = useQuery(
    getQueryFnAndKey("getWidget", {
      id: siloId,
    }),
  )

  const undeployedTokens = filterTokens("NOT_DEPLOYED", tokens?.items)
  const pendingTokens = filterTokens("PENDING", tokens?.items)
  const deployedTokens = filterTokens("DEPLOYED", tokens?.items)
  const activeTokens =
    tokens?.items.filter((token) => widget?.tokens.includes(token.id)) ?? []

  return {
    isPending: isSiloTokensPending || isWidgetPending,
    allTokens: tokens?.items ?? [],
    activeTokens,
    pendingTokens,
    deployedTokens,
    undeployedTokens,
  }
}
