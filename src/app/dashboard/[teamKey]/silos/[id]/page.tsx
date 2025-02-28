"use client"

import { useSuspenseQueries } from "@tanstack/react-query"
import { queries } from "@/actions/queries"
import { DashboardHomePage } from "@/app/dashboard/[teamKey]/(new)/Dashboard"

const Page = ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  const siloId = Number(id)
  const [
    { data: team },
    { data: silo },
    { data: silos },
    { data: siloConfigTransactions },
    { data: onboardingForm },
  ] = useSuspenseQueries({
    queries: [
      queries.getTeamByKey(teamKey),
      queries.getTeamSiloByKey(teamKey, siloId),
      queries.getTeamSilosByKey(teamKey),
      queries.getSiloConfigTransactions(siloId),
      queries.getTeamOnboardingFormByKey(teamKey),
    ],
  })

  return (
    <DashboardHomePage
      team={team}
      silo={silo}
      silos={silos}
      siloConfigTransactions={siloConfigTransactions}
      onboardingForm={onboardingForm}
    />
  )
}

export default Page
