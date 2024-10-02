import { ReactNode } from "react"
import clsx from "clsx"

const Loader = ({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) => (
  <div
    className={clsx("bg-slate-100 animate-pulse", className)}
    aria-hidden="true"
  >
    {children}
  </div>
)

export default Loader
