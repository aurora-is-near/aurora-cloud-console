import { ReactNode } from "react"
import clsx from "clsx"
import { Spinner } from "@/components/Spinner"

type ButtonContentProps = {
  isLoading?: boolean
  fullWidth?: boolean
  children: ReactNode
}

export const ButtonContent = ({
  isLoading,
  fullWidth,
  children,
}: ButtonContentProps) => (
  <>
    <span
      className={clsx("flex items-center justify-center gap-2", {
        "opacity-0": isLoading,
        "w-full": fullWidth,
      })}
    >
      {children}
    </span>
    {isLoading && <Spinner />}
  </>
)
