import { featureFlags } from "@/feature-flags/server"
import { DeploymentProgressAuto } from "@/app/dashboard/[teamKey]/(new)/DeploymentProgress"
import { DeploymentProgressManual } from "@/app/dashboard/[teamKey]/(new)/DeploymentProgressManual"
import type { OnboardingStatus, Team, Silo } from "@/types/types"

type StartDeploymentProps = {
  team: Team
  silo: Silo | null
  onboardingStatus: OnboardingStatus
  isOnboardingFormSubmitted: boolean
}

export const StartDeployment = (props: StartDeploymentProps) => {
  const isAutomated = featureFlags.get("automate_silo_configuration")

  if (isAutomated) {
    return <DeploymentProgressAuto {...props} />
  }

  return <DeploymentProgressManual status={props.onboardingStatus} />
}
