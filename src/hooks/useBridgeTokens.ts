import { TokenSchema } from "@/types/api-schemas"
import { DeploymentStatus } from "@/types/types"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { useQuery } from "@tanstack/react-query"

const filterTokens = (status: DeploymentStatus, tokens: TokenSchema[] = []) =>
  tokens.filter((token) => token.bridgeDeploymentStatus === status)

export const useBridgeTokens = (siloId: number) => {
  const { data: tokens, isPending } = useQuery(
    getQueryFnAndKey("getSiloTokens", {
      id: siloId,
    }),
  )

  const undeployedTokens = filterTokens("NOT_DEPLOYED", tokens?.items)
  const pendingTokens = filterTokens("PENDING", tokens?.items)
  const deployedTokens = filterTokens("DEPLOYED", tokens?.items)

  return {
    isPending: isPending,
    allTokens: tokens?.items ?? [],
    pendingTokens,
    deployedTokens,
    undeployedTokens,
  }
}
