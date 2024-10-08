import clsx from "clsx"
import { ReactNode } from "react"

type BaseContainerProps = {
  children: ReactNode
  className?: string
}

export const BaseContainer = ({ children, className }: BaseContainerProps) => (
  <div
    className={clsx(
      "px-4 py-6 md:px-6 lg:px-8 w-full mx-auto max-w-[1044px]",
      className,
    )}
  >
    {children}
  </div>
)
