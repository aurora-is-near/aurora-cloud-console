import { CardProgress } from "@/uikit"
import { Team } from "@/types/types"

type Props = {
  status: Exclude<Team["onboarding_status"], null>
}

export const DeploymentProgress = ({ status }: Props) => {
  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <CardProgress
        index={1}
        isActive={status === "REQUEST_RECEIVED"}
        title="Request received"
        text="We are preparing to configure your chain and we’ll be soon in touch."
      />

      <CardProgress
        index={2}
        isActive={status === "DEPLOYMENT_IN_PROGRESS"}
        title="Deployment started"
        text="It’s a matter of 2-3 days only before your chain is completely operational."
      />

      <CardProgress
        index={3}
        isActive={status === "DEPLOYMENT_DONE"}
        title="Deployment done"
        text="We’ll help you deploy the chosen integrations next."
      />
    </div>
  )
}
