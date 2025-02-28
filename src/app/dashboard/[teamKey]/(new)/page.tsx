"use client"

import { Suspense } from "react"
import { useSuspenseQueries } from "@tanstack/react-query"
import { Spinner } from "@/components/Spinner"
import { queries } from "@/actions/queries"
import { DashboardHomePage } from "@/app/dashboard/[teamKey]/(new)/Dashboard"

const Page = ({ params: { teamKey } }: { params: { teamKey: string } }) => {
  const [
    { data: team },
    { data: silos },
    { data: onboardingForm },
    { data: unassignedSiloId },
  ] = useSuspenseQueries({
    queries: [
      queries.getTeamByKey(teamKey),
      queries.getTeamSilosByKey(teamKey),
      queries.getTeamOnboardingFormByKey(teamKey),
      queries.getUnassignedSiloId(),
    ],
  })

  return (
    <Suspense fallback={<Spinner fullScreen size="lg" />}>
      <DashboardHomePage
        team={team}
        silos={silos}
        onboardingForm={onboardingForm}
        hasUnassignedSilo={!!unassignedSiloId}
      />
    </Suspense>
  )
}

export default Page
