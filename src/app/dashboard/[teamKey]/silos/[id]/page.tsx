import { notFound } from "next/navigation"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { DashboardHomePage } from "@/app/dashboard/[teamKey]/(new)/Dashboard"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import { getSiloConfigTransactions } from "@/actions/silo-config-transactions/get-silo-config-transactions"
import { getTeamOnboardingFormByKey } from "@/actions/onboarding/get-team-onboarding-form-by-key"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  const [team, silo, siloConfigTransactions, onboardingForm] =
    await Promise.all([
      getTeamByKey(teamKey),
      getTeamSiloByKey(teamKey, Number(id)),
      getSiloConfigTransactions(Number(id), "SET_BASE_TOKEN"),
      getTeamOnboardingFormByKey(teamKey),
    ])

  const siloBaseTokenTransactionStatus = siloConfigTransactions.find(
    (transaction) => transaction.operation === "SET_BASE_TOKEN",
  )?.status

  if (!silo) {
    notFound()
  }

  return (
    <DashboardHomePage
      team={team}
      silo={silo}
      onboardingForm={onboardingForm}
      siloBaseTokenTransactionStatus={siloBaseTokenTransactionStatus}
    />
  )
}

export default Page
