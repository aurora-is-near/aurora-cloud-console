import { ReactNode } from "react"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { MainDashboardLayout } from "@/components/MainDashboardLayout"
import { getQueryClient } from "@/query-client"
import { queries } from "@/actions/queries"

const Layout = ({
  children,
  params: { id, teamKey },
}: {
  children: ReactNode
  params: { id: string; teamKey: string }
}) => {
  const queryClient = getQueryClient()
  const siloId = Number(id)

  // Prefetch some common queries used throughout the dashboard
  void queryClient.prefetchQuery(queries.getTeamByKey(teamKey))
  void queryClient.prefetchQuery(queries.getTeamSiloByKey(teamKey, siloId))
  void queryClient.prefetchQuery(queries.getSiloConfigTransactions(siloId))
  void queryClient.prefetchQuery(queries.getTeamOnboardingFormByKey(teamKey))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainDashboardLayout teamKey={teamKey} siloId={siloId}>
        {children}
      </MainDashboardLayout>
    </HydrationBoundary>
  )
}

export default Layout
