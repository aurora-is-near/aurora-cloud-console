import clsx from "clsx"
import { ReactNode } from "react"

type PillProps = {
  children: ReactNode
  variant?: "grey" | "active" | "pending"
}

export const Pill = ({ children, variant = "grey" }: PillProps) => {
  return (
    <span
      className={clsx(
        "text-xs rounded-md px-1 py-0.5 font-medium self-start flex gap-x-1",
        {
          "text-slate-900 bg-slate-200": variant === "grey",
          "bg-green-200 text-green-700": variant === "active",
          "bg-orange-200 text-orange-700": variant === "pending",
        },
      )}
    >
      {children}
    </span>
  )
}
