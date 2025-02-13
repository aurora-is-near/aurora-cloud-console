import { DeploymentProgress } from "@/app/dashboard/[teamKey]/(new)/DeploymentProgress"
import { featureFlags } from "@/feature-flags/server"
import { OnboardingForm, OnboardingStatus, Team } from "@/types/types"
import { StartDeploymentButton } from "@/app/dashboard/[teamKey]/(new)/StartDeploymentButton"

type StartDeploymentProps = {
  team: Team
  onboardingStatus: OnboardingStatus
  onboardingForm?: OnboardingForm | null
}

export const StartDeployment = ({
  team,
  onboardingStatus,
  onboardingForm,
}: StartDeploymentProps) => {
  const isAutomated =
    featureFlags.get("automate_silo_configuration") && !!onboardingForm

  if (isAutomated) {
    return <StartDeploymentButton team={team} />
  }

  return <DeploymentProgress status={onboardingStatus} />
}
