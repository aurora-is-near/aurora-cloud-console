import { DeploymentProgress } from "@/app/dashboard/[teamKey]/(new)/DeploymentProgress"
import { featureFlags } from "@/feature-flags/server"
import { OnboardingStatus } from "@/types/types"
import { StartDeploymentButton } from "@/app/dashboard/[teamKey]/(new)/StartDeploymentButton"

type StartDeploymentProps = {
  teamId: number
  onboardingStatus: OnboardingStatus
}

export const StartDeployment = ({
  teamId,
  onboardingStatus,
}: StartDeploymentProps) => {
  const isAutomated = featureFlags.get("automate_silo_configuration")

  if (isAutomated) {
    return <StartDeploymentButton teamId={teamId} />
  }

  return <DeploymentProgress status={onboardingStatus} />
}
