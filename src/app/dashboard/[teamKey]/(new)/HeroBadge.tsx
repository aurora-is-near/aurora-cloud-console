import { ClockIcon } from "@heroicons/react/24/solid"

import { Typography } from "@/uikit"

const LiveBadge = () => (
  <div className="flex items-center gap-3 py-3 px-4 rounded-md bg-green-100">
    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
    <Typography variant="label" size={2} className="text-slate-900">
      Your chain is live
    </Typography>
  </div>
)

const InDeploymentBadge = () => (
  <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-slate-200">
    <ClockIcon className="w-5 h-5 text-slate-500" />
    <Typography variant="label" size={2} className="text-slate-500">
      In deployment
    </Typography>
  </div>
)

type Props = {
  hasSilo: boolean
  isOnboardingFormSubmitted: boolean
}

export const HeroBadge = ({ hasSilo, isOnboardingFormSubmitted }: Props) => {
  if (hasSilo) {
    return <LiveBadge />
  }

  if (isOnboardingFormSubmitted) {
    return <InDeploymentBadge />
  }

  return null
}
