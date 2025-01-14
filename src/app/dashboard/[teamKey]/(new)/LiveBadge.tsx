import { Typography } from "@/uikit"

export const LiveBadge = () => (
  <div className="flex items-center gap-3 py-3 px-4 rounded-md bg-green-100">
    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
    <Typography variant="label" size={2} className="text-slate-900">
      Your chain is live
    </Typography>
  </div>
)
