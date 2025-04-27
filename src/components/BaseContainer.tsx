import clsx from "clsx"
import { ReactNode } from "react"

type BaseContainerProps = {
  children: ReactNode
  className?: string
  size?: "md" | "lg"
}

export const BaseContainer = ({
  children,
  className,
  size = "md",
}: BaseContainerProps) => (
  <div
    className={clsx(
      "px-4 md:px-6 lg:px-8 w-full mx-auto",
      {
        "max-w-[1044px]": size === "md",
        "max-w-[1289px]": size === "lg",
      },
      className,
    )}
  >
    {children}
  </div>
)
