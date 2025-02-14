"use client"

import { useState } from "react"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid"
import type { ComponentProps } from "react"

import { Button } from "@/components/Button"
import { ListProgress } from "@/uikit"
import type { ListProgressState } from "@/uikit"
import type { Silo, Team, OnboardingStatus } from "@/types/types"

import { useSteps } from "./useSteps"

type Props = {
  team: Team
  silo: Silo | null
  onboardingStatus: OnboardingStatus
  isOnboardingFormSubmitted: boolean
}

const StepAction = (props: ComponentProps<typeof Button>) => (
  <Button {...props} size="md" />
)

const Steps = ({
  team,
  steps,
}: {
  team: Team
  steps: { name: keyof ReturnType<typeof useSteps>; state: ListProgressState }[]
}) => {
  const possibleSteps = useSteps({ team })
  return (
    <ListProgress>
      {steps.map(({ name, state }) => (
        <ListProgress.Item
          state={state}
          title={possibleSteps[name].title}
          {...possibleSteps[name][state]}
        >
          {possibleSteps[name][state]?.action && (
            <StepAction {...possibleSteps[name][state].action} />
          )}
        </ListProgress.Item>
      ))}
    </ListProgress>
  )
}

export const DeploymentProgressAuto = ({
  team,
  silo,
  isOnboardingFormSubmitted,
}: Props) => {
  const [isDeploymentStarted, setIsDeploymentStarted] = useState(false)

  // Welcome
  if (!silo && !isDeploymentStarted) {
    return (
      <Steps
        team={team}
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
      <Steps
        team={team}
        steps={[
          { name: "CONFIGURE_CHAIN", state: "completed" },
          { name: "START_DEPLOYMENT", state: "current" },
        ]}
      />
    )
  }

  // Deployment triggered
  if (!silo && isDeploymentStarted) {
    return (
      <Steps
        team={team}
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
        {silo.explorer_url && (
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
        )}
        <Button size="lg" variant="border">
          Customize Block Explorer
        </Button>
      </div>
    )
  }
}
