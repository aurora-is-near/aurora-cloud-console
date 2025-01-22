import { ClockIcon } from "@heroicons/react/24/solid"

import { Typography } from "@/uikit"
import { LinkButton } from "@/components/LinkButton"
import type { Team } from "@/types/types"

type Props = {
  team: Team
  isOnboardingFormSubmitted: boolean
}

const InDeploymentBadge = () => (
  <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-slate-200">
    <ClockIcon className="w-5 h-5 text-slate-500" />
    <Typography variant="label" size={2} className="text-slate-500">
      In deployment
    </Typography>
  </div>
)

export const HomeHeroAction = ({ team, isOnboardingFormSubmitted }: Props) => {
  if (!isOnboardingFormSubmitted && !team.onboarding_status) {
    return (
      <LinkButton
        href={`/dashboard/${team.team_key}/create-chain`}
        size="lg"
        trackEventName="get_started_click"
      >
        <span>Get started</span>
      </LinkButton>
    )
  }

  if (isOnboardingFormSubmitted && !team.onboarding_status) {
    return null
  }

  return <InDeploymentBadge />
}
