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
import { DeploymentSteps, ModalConfirmDeployment, Steps } from "./components"
import { useSteps } from "./hooks"

type Props = {
  team: Team
  silo: Silo | null
  isDeploymentComplete: boolean
  onboardingFormData: OnboardingForm | null
  setIsDeploymentComplete: (isDeploymentComplete: boolean) => void
  siloBaseTokenTransactionStatus?: SiloConfigTransactionStatus
}

export const DeploymentProgressAuto = ({
  team,
  silo,
  onboardingFormData,
  isDeploymentComplete,
  setIsDeploymentComplete,
  siloBaseTokenTransactionStatus,
}: Props) => {
  const [isConfirmDeploymentModalOpen, setIsConfirmDeploymentModalOpen] =
    useState(false)

  const allSteps = useSteps({
    team,
    onClick: ({ name }) => {
      if (name === "START_DEPLOYMENT") {
        setIsConfirmDeploymentModalOpen(true)
      }
    },
  })

  // Welcome
  if (!silo && !onboardingFormData) {
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

  // Custom base token
  if (!silo && onboardingFormData?.baseToken === "CUSTOM") {
    return (
      <Steps
        allSteps={allSteps}
        steps={[
          { name: "CONFIGURE_CHAIN", state: "completed" },
          { name: "MANUAL_DEPLOYMENT", state: "current" },
        ]}
      />
    )
  }

  // Onboarding passed
  if (!silo) {
    return (
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
