import { useQuery } from "@tanstack/react-query"
import { getQueryFnAndKey } from "@/utils/api/queries"

export const useWidgetUrl = (siloId: number) => {
  const { data } = useQuery(
    getQueryFnAndKey("getWidget", {
      id: siloId,
    }),
  )

  return data?.widgetUrl
}
