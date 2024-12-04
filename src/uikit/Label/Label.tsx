import { clsx } from "../clsx"
import { Typography } from "../Typography"
import { InfoTooltip } from "../InfoTooltip"

type Props = {
  children: string
  tooltip?: string
  className?: string
}

export const Label = ({ children, tooltip, className }: Props) => (
  <div className={clsx("col-span-2 flex items-center gap-x-1", className)}>
    <Typography variant="label" size={3} className="text-slate-900">
      {children}
    </Typography>
    {tooltip ? <InfoTooltip>{tooltip}</InfoTooltip> : null}
  </div>
)
