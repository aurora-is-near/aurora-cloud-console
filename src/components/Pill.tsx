import clsx from "clsx"
import { ReactNode } from "react"

type PillProps = {
  children: ReactNode
  variant?: "grey" | "active" | "pending"
  size?: "md" | "lg"
}

export const Pill = ({
  children,
  variant = "grey",
  size = "md",
}: PillProps) => {
  return (
    <span
      className={clsx(
        "text-xs rounded-md font-medium self-start flex gap-x-1",
        {
          "text-slate-900 bg-slate-200": variant === "grey",
          "bg-green-200 text-green-700": variant === "active",
          "bg-orange-200 text-orange-700": variant === "pending",
          "text-xs px-1 py-0.5": size === "md",
          "text-sm px-1.5 py-1": size === "lg",
        },
      )}
    >
      {children}
    </span>
  )
}
