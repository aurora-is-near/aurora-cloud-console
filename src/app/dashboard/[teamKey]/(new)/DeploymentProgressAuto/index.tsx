"use client"

import { useState } from "react"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid"

import { Button } from "@/components/Button"
import type { Silo, Team } from "@/types/types"

import { DeploymentSteps, ModalConfirmDeployment, Steps } from "./components"
import { useSteps } from "./hooks"

type Props = {
  team: Team
  silo: Silo | null
  isOnboardingFormSubmitted: boolean
}

export const DeploymentProgressAuto = ({
  team,
  silo,
  isOnboardingFormSubmitted,
}: Props) => {
  const [isDeploymentComplete, setIsDeploymentComplete] = useState<boolean>(
    !!silo?.is_active,
  )

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
  if (!silo && !isOnboardingFormSubmitted) {
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
      {silo.explorer_url ? (
        <Button
          size="lg"
          variant="primary"
          onClick={() =>
            silo.explorer_url && window.open(silo.explorer_url, "_blank")
          }
        >
          Open Block Explorer
          <ArrowTopRightOnSquareIcon className="w-5 h-5" />
        </Button>
      ) : null}
      <Button size="lg" variant="border">
        Customize Block Explorer
      </Button>
    </div>
  )
}
