import { InformationCircleIcon } from "@heroicons/react/20/solid"

import { clsx } from "../clsx"
import { Typography } from "../Typography"

type Props = {
  children: string
  className?: string
}

export const InfoTooltip = ({ children, className }: Props) => (
  <div
    className={clsx(
      "h-5 w-5 relative flex items-center justify-center group cursor-pointer",
      className,
    )}
  >
    <InformationCircleIcon className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors duration-200" />
    <div className="cursor-auto pt-1 hidden group-hover:block absolute top-full left-1">
      <div className="relative z-10 bg-slate-700 shadow-lg rounded-lg py-2 px-3 w-52">
        <Typography
          variant="paragraph"
          size={4}
          className="text-white break-words"
        >
          {children}
        </Typography>
      </div>
    </div>
  </div>
)
