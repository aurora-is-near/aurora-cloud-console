"use client"

import { useSuspenseQueries } from "@tanstack/react-query"
import { notFound, redirect } from "next/navigation"
import { Suspense } from "react"
import { useFeatureFlags } from "@/hooks/useFeatureFlags"
import { WelcomeDashboardContent } from "@/app/dashboard/[teamKey]/(new)/WelcomeDashboardContent"
import { Spinner } from "@/components/Spinner"
import { queries } from "@/actions/queries"

type WelcomeDashboardProps = {
  teamKey: string
  siloId?: number
}

export const WelcomeDashboard = ({
  teamKey,
  siloId,
}: WelcomeDashboardProps) => {
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

  const { flags } = useFeatureFlags()

  const siloBaseTokenTransactionStatus = siloConfigTransactions.find(
    (transaction) => transaction.operation === "SET_BASE_TOKEN",
  )?.status

  // If a silo ID was given but it doesn't exist, return a 404
  if (siloId && !silo) {
    notFound()
  }

  // If no silo ID was given but the team does have silos redirect to the
  // first one.
  if (!siloId && !!silos[0]) {
    redirect(`/dashboard/${teamKey}/silos/${silos[0].id}`)
  }

  return (
    <Suspense fallback={<Spinner fullScreen size="lg" />}>
      <WelcomeDashboardContent
        team={team}
        silo={silo}
        onboardingForm={onboardingForm}
        isAutomated={!!flags.automate_silo_configuration}
        siloBaseTokenTransactionStatus={siloBaseTokenTransactionStatus}
      />
    </Suspense>
  )
}
