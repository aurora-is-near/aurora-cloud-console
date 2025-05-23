import clsx from "clsx"
import Link from "next/link"
import { ReactNode } from "react"

type MarketPlacePillProps = {
  children: ReactNode
  href: string
  variant?: "default" | "green"
}

export const MarketPlacePill = ({
  children,
  href,
  variant = "default",
}: MarketPlacePillProps) => {
  return (
    <Link
      href={href}
      className={clsx(
        "rounded-full p-1.5 border text-sm font-medium tracking-tight leading-none flex flex-row items-center",
        {
          "bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-50":
            variant === "default",
          "bg-green-100 border-grey-100 hover:bg-green-200 text-slate-900":
            variant === "green",
        },
      )}
    >
      {children}
    </Link>
  )
}
