import { ReactNode } from "react"
import { clsx } from "../clsx"
import { Typography } from "../Typography"

type Props = {
  children: string | ReactNode
  trigger: ReactNode
  className?: string
  width?: number
}

export const Tooltip = ({ children, trigger, className, width }: Props) => (
  <div
    className={clsx(
      "relative flex items-center justify-center group cursor-pointer",
      className,
    )}
  >
    {trigger}
    <div className="cursor-auto pt-1 hidden group-hover:block absolute top-full left-1">
      <div
        className={clsx(
          "relative z-10 bg-slate-700 shadow-lg rounded-lg py-2 px-3",
          !width && "w-52",
        )}
        style={{ width }}
      >
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
