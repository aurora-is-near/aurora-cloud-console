import clsx from "clsx"
import { ReactNode } from "react"

type MarketPlacePillProps = {
  children: ReactNode
  variant?: "default" | "green"
}

export const MarketPlacePill = ({
  children,
  variant = "default",
}: MarketPlacePillProps) => {
  return (
    <div
      className={clsx(
        "rounded-full p-1.5 border text-sm font-medium text-slate-900 tracking-tight leading-none flex flex-row items-center",
        {
          "bg-slate-200 border-slate-300": variant === "default",
          "bg-green-100 border-grey-100": variant === "green",
        },
      )}
    >
      {children}
    </div>
  )
}
