"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid"

import { Button } from "@/components/Button"
import type { Silo, Team } from "@/types/types"

import { Steps, ModalConfirmDeployment } from "./components"
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
  const router = useRouter()
  const [isDeploymentStarted] = useState(false)
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
  if (!silo && !isDeploymentStarted && !isOnboardingFormSubmitted) {
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
  if (!silo && !isDeploymentStarted && isOnboardingFormSubmitted) {
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
          isOpen={isConfirmDeploymentModalOpen}
          onClickConfirm={() => null} // TODO: implement
          onClose={() => setIsConfirmDeploymentModalOpen(false)}
          onClickEdit={() => {
            router.push(`/dashboard/${team.team_key}/create-chain`)
          }}
        />
      </>
    )
  }

  // Deployment triggered
  if (!silo && isDeploymentStarted) {
    return (
      <Steps
        allSteps={allSteps}
        steps={[
          { name: "CONFIGURED_CHAIN", state: "completed" },
          { name: "INIT_AURORA_ENGINE", state: "current" },
          { name: "SETTING_BASE_TOKEN", state: "upcoming" },
          { name: "START_BLOCK_EXPLORER", state: "upcoming" },
          { name: "CHAIN_DEPLOYED", state: "upcoming" },
        ]}
      />
    )
  }

  // Deployment done
  // TODO: && basedToken is assigned successfully
  if (silo) {
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
}
