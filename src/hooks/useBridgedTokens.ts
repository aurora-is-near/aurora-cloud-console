import { useQuery } from "@tanstack/react-query"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { getBridgedTokens } from "@/actions/bridged-tokens/get-bridged-tokens"

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

  return {
    isPending:
      isSiloTokensPending ||
      isSiloTokenRequestsPending ||
      isSupportedTokensPending,
    supportedTokens,
    bridgedSiloTokens: bridgedSiloTokens?.items ?? [],
    bridgedSiloTokenRequests: bridgedSiloTokenRequests?.items ?? [],
  }
}
