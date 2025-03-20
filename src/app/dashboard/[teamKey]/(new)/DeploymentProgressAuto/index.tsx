"use client"

import { useMemo } from "react"
import { useQueries } from "@tanstack/react-query"
import type { Silo, Team } from "@/types/types"
import { DEFAULT_SILO_CONFIG_TRANSACTION_STATUSES } from "@/constants/silo-config-transactions"
import { getSiloConfigTransactions } from "@/actions/silo-config-transactions/get-silo-config-transactions"
import { getTeamOnboardingFormByKey } from "@/actions/onboarding/get-team-onboarding-form-by-key"
import { getUnassignedSiloId } from "@/actions/silos/get-unassigned-silo-id"
import { DeploymentProgressContent } from "./DeploymentProgressContent"

type Props = {
  team: Team
  silo: Silo | null
  isDeploymentComplete: boolean
  setIsDeploymentComplete: (isDeploymentComplete: boolean) => void
}

export const DeploymentProgressAuto = ({
  team,
  silo,
  isDeploymentComplete,
  setIsDeploymentComplete,
}: Props) => {
  const [
    {
      data: siloConfigTransactions,
      isPending: isSiloConfigTransactionsPending,
    },
    { data: onboardingForm = null, isPending: isOnboardingFormPending },
    { data: unassignedSiloId, isPending: isUnassignedSiloIdPending },
  ] = useQueries({
    queries: [
      {
        queryKey: ["silo-config-transactions", silo?.id, "SET_BASE_TOKEN"],
        queryFn: () =>
          silo ? getSiloConfigTransactions(silo.id, "SET_BASE_TOKEN") : [],
      },
      {
        queryKey: ["teamOnboardingForm", team.team_key],
        queryFn: () => getTeamOnboardingFormByKey(team.team_key),
      },
      {
        queryKey: ["unassgined-silo"],
        queryFn: () => (silo ? getUnassignedSiloId() : null),
      },
    ],
  })

  const siloTransactionStatuses = useMemo(
    () =>
      Object.keys(DEFAULT_SILO_CONFIG_TRANSACTION_STATUSES).reduce(
        (acc, operation) => ({
          ...acc,
          [operation]:
            siloConfigTransactions?.find(
              (transaction) => transaction.operation === operation,
            )?.status ?? null,
        }),
        DEFAULT_SILO_CONFIG_TRANSACTION_STATUSES,
      ),
    [siloConfigTransactions],
  )

  if (
    isSiloConfigTransactionsPending ||
    isOnboardingFormPending ||
    isUnassignedSiloIdPending
  ) {
    return null
  }

  return (
    <DeploymentProgressContent
      team={team}
      silo={silo}
      isDeploymentComplete={isDeploymentComplete}
      setIsDeploymentComplete={setIsDeploymentComplete}
      onboardingForm={onboardingForm}
      siloTransactionStatuses={siloTransactionStatuses}
      hasUnassignedSilo={!!unassignedSiloId}
    />
  )
}
