import { useRequiredContext } from "@/hooks/useRequiredContext"
import { AnalyticsContext } from "@/providers/AnalyticsProvider"

export const useAnalytics = () => {
  const ctx = useRequiredContext(AnalyticsContext)

  return ctx.mixPanel
}
