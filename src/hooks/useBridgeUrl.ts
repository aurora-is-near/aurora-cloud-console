import { getQueryFnAndKey } from "@/utils/api/queries"
import { useQuery } from "@tanstack/react-query"

export const useBridgeUrl = (siloId: number) => {
  const { data: bridge } = useQuery(
    getQueryFnAndKey("getSiloBridge", {
      id: siloId,
    }),
  )

  return bridge?.widgetUrl
}
