"use client"

import { useState } from "react"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid"

import { Button } from "@/components/Button"
import type {
  OnboardingForm,
  Silo,
  SiloConfigTransactionStatus,
  Team,
} from "@/types/types"

import { LinkButton } from "@/components/LinkButton"
import { AUTOMATED_BASE_TOKENS } from "@/constants/base-token"
import { DeploymentSteps, ModalConfirmDeployment, Steps } from "./components"
import { useSteps } from "./hooks"

type Props = {
  team: Team
  silo: Silo | null
  onboardingForm: OnboardingForm | null
  isDeploymentComplete: boolean
  setIsDeploymentComplete: (isDeploymentComplete: boolean) => void
  siloBaseTokenTransactionStatus?: SiloConfigTransactionStatus
  hasUnassignedSilo?: boolean
}

export const DeploymentProgressAuto = ({
  team,
  silo,
  onboardingForm,
  isDeploymentComplete,
  setIsDeploymentComplete,
  siloBaseTokenTransactionStatus,
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
  if (!isDeploymentComplete) {
    return (
      <DeploymentSteps
        silo={silo}
        siloBaseTokenTransactionStatus={siloBaseTokenTransactionStatus}
        team={team}
        onDeploymentComplete={() => {
          setIsDeploymentComplete(true)
        }}
      />
    )
  }

  // Deployment done
  return (
    <div className="flex gap-2">
      {!!silo.explorer_url && (
        <LinkButton
          isExternal
          size="lg"
          variant="primary"
          href={silo.explorer_url}
        >
          Open Block Explorer
          <ArrowTopRightOnSquareIcon className="w-5 h-5" />
        </LinkButton>
      )}
      <Button size="lg" variant="border">
        Customize Block Explorer
      </Button>
    </div>
  )
}
