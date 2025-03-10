import { useQuery } from "@tanstack/react-query"
import { getQueryFnAndKey } from "@/utils/api/queries"

export const useWidgetTokens = (siloId: number) => {
  const { data } = useQuery(
    getQueryFnAndKey("getWidget", {
      id: siloId,
    }),
  )

  return data?.tokens ?? []
}
