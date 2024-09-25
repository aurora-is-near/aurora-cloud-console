import clsx from "clsx"
import { ReactNode } from "react"

type HeadingProps = {
  children: ReactNode
  className?: string
}

export const AuthHeading = ({ children, className }: HeadingProps) => (
  <h1
    className={clsx(
      "text-center text-2xl font-bold leading-9 tracking-tight text-white",
      className,
    )}
  >
    {children}
  </h1>
)
