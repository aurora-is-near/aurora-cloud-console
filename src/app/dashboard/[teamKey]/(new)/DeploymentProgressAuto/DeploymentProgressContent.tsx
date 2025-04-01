"use client"

import { useState } from "react"
import type { OnboardingForm, Silo, Team } from "@/types/types"
import { AUTOMATED_BASE_TOKENS } from "@/constants/base-token"
import { SiloConfigTransactionStatuses } from "@/types/silo-config-transactions"
import { DeploymentSteps, ModalConfirmDeployment, Steps } from "./components"
import { useSteps } from "./hooks"

type Props = {
  team: Team
  silo: Silo | null
  onboardingForm: OnboardingForm | null
  setIsDeploymentComplete: (isDeploymentComplete: boolean) => void
  siloTransactionStatuses?: SiloConfigTransactionStatuses
  hasUnassignedSilo?: boolean
}

export const DeploymentProgressContent = ({
  team,
  silo,
  onboardingForm,
  setIsDeploymentComplete,
  siloTransactionStatuses,
  hasUnassignedSilo,
}: Props) => {
  const [isConfirmDeploymentModalOpen, setIsConfirmDeploymentModalOpen] =
    useState(false)

  const canBeAutomated =
    hasUnassignedSilo &&
    onboardingForm?.baseToken &&
    AUTOMATED_BASE_TOKENS.includes(onboardingForm.baseToken)

  const allSteps = useSteps({
    team,
    onClick: ({ name }) => {
      if (name === "START_DEPLOYMENT") {
        setIsConfirmDeploymentModalOpen(true)
      }
    },
  })

  // Welcome
  if (!silo && !onboardingForm) {
    return (
      <Steps
        allSteps={allSteps}
        steps={[
          { name: "CONFIGURE_CHAIN", state: "current" },
          { name: "START_DEPLOYMENT", state: "upcoming" },
        ]}
      />
    )
  }

  // Onboarding passed
  if (!silo) {
    return canBeAutomated ? (
      <>
        <Steps
          allSteps={allSteps}
          steps={[
            { name: "CONFIGURE_CHAIN", state: "completed" },
            { name: "START_DEPLOYMENT", state: "current" },
          ]}
        />
        <ModalConfirmDeployment
          team={team}
          isOpen={isConfirmDeploymentModalOpen}
          onClose={() => setIsConfirmDeploymentModalOpen(false)}
        />
      </>
    ) : (
      <Steps
        allSteps={allSteps}
        steps={[
          { name: "CONFIGURE_CHAIN", state: "completed" },
          { name: "MANUAL_DEPLOYMENT", state: "current" },
        ]}
      />
    )
  }

  // Automatic deployment in progress
  return (
    <DeploymentSteps
      silo={silo}
      siloTransactionStatuses={siloTransactionStatuses}
      chainPermission={onboardingForm?.chainPermission ?? "private"}
      team={team}
      onDeploymentComplete={() => {
        setIsDeploymentComplete(true)
      }}
    />
  )
}
