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
        "rounded-full p-1.5 border text-sm font-medium text-slate-900 tracking-tight leading-none flex flex-row items-center",
        {
          "bg-slate-200 border-slate-300 hover:bg-slate-300":
            variant === "default",
          "bg-green-100 border-grey-100 hover:bg-green-200":
            variant === "green",
        },
      )}
    >
      {children}
    </Link>
  )
}
