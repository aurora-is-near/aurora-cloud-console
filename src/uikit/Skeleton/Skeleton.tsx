import type { PropsWithChildren } from "react"

import { clsx } from "../clsx"

type Props = PropsWithChildren<{
  className?: string
}>

export const Skeleton = ({ children, className }: Props) => {
  return (
    <div
      className={clsx(
        "h-6 w-full bg-slate-100 rounded-full animate-pulse",
        className,
      )}
    >
      {children}
    </div>
  )
}
