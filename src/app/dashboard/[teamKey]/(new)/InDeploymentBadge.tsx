import { ClockIcon } from "@heroicons/react/24/solid"

import { Typography } from "@/uikit"

export const InDeploymentBadge = () => (
  <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-slate-200">
    <ClockIcon className="w-5 h-5 text-slate-500" />
    <Typography variant="label" size={2} className="text-slate-500">
      In deployment
    </Typography>
  </div>
)
