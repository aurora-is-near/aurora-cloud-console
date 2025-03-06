import { notFound } from "next/navigation"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { DashboardHomePage } from "@/app/dashboard/[teamKey]/(new)/Dashboard"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import { getSiloConfigTransactions } from "@/actions/silo-config-transactions/get-silo-config-transactions"
import { getTeamOnboardingFormByKey } from "@/actions/onboarding/get-team-onboarding-form-by-key"
import { SiloConfigTransactionStatuses } from "@/types/silo-config-transactions"

const DEFAULT_SILO_CONFIG_TRANSACTION_STATUSES: SiloConfigTransactionStatuses =
  {
    SET_BASE_TOKEN: null,
    DEPLOY_NEAR: null,
    DEPLOY_USDC: null,
    DEPLOY_USDT: null,
    DEPLOY_AURORA: null,
    DEPLOY_ETH: null,
  }

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  const [team, silo, siloConfigTransactions, onboardingForm] =
    await Promise.all([
      getTeamByKey(teamKey),
      getTeamSiloByKey(teamKey, Number(id)),
      getSiloConfigTransactions(Number(id)),
      getTeamOnboardingFormByKey(teamKey),
    ])

  const siloTransactionStatuses = Object.keys(
    DEFAULT_SILO_CONFIG_TRANSACTION_STATUSES,
  ).reduce(
    (acc, operation) => ({
      ...acc,
      [operation]:
        siloConfigTransactions.find(
          (transaction) => transaction.operation === operation,
        )?.status ?? null,
    }),
    DEFAULT_SILO_CONFIG_TRANSACTION_STATUSES,
  )

  if (!silo) {
    notFound()
  }

  return (
    <DashboardHomePage
      team={team}
      silo={silo}
      onboardingForm={onboardingForm}
      siloTransactionStatuses={siloTransactionStatuses}
    />
  )
}

export default Page
