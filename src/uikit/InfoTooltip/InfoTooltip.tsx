import { InformationCircleIcon } from "@heroicons/react/20/solid"
import { Tooltip } from "@/uikit/Tooltip"

type Props = {
  children: string
  className?: string
}

export const InfoTooltip = ({ children, className }: Props) => (
  <Tooltip
    className={className}
    trigger={
      <InformationCircleIcon className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors duration-200 m-0.5" />
    }
  >
    {children}
  </Tooltip>
)
