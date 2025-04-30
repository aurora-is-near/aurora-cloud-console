import { useRequiredContext } from "@/hooks/useRequiredContext"
import { PreviousRouteContext } from "@/providers/PreviousRouteProvider"

export const usePreviousRoute = () => {
  const { previousRoute } = useRequiredContext(PreviousRouteContext)

  return { previousRoute }
}
