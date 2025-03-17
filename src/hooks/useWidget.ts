import { useQuery } from "@tanstack/react-query"
import { getQueryFnAndKey } from "@/utils/api/queries"

export const useWidget = (siloId: number) => {
  const { data } = useQuery(
    getQueryFnAndKey("getWidget", {
      id: siloId,
    }),
  )

  return data
}
